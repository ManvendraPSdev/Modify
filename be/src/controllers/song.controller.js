const path = require("path")
const songModel = require("../models/songs.model.js")
const storageService = require("../services/storage.service.js")
const id3 = require("node-id3")

function safeTitleFromTags(tags, originalname) {
    const t = tags.title && String(tags.title).trim()
    if (t) return t
    if (originalname) return path.parse(originalname).name || "track"
    return "track"
}

function posterExtension(tags) {
    const mime = tags.image && tags.image.mime
    if (!mime || typeof mime !== "string") return "jpg"
    const sub = mime.split("/")[1]
    if (sub === "jpeg") return "jpg"
    return sub || "jpg"
}

async function uploadSongController(req, res) {
    try {
        const songBuffer = req.file.buffer
        const { mood } = req.body
        const tags = id3.read(songBuffer)
        const baseTitle = safeTitleFromTags(tags, req.file.originalname)

        const songFile = await storageService.uploadFile({
            buffer: songBuffer,
            filename: `${baseTitle}.mp3`,
            folder: "/cohort-2/moodify/songs"
        })

        const posterBuf = tags.image && tags.image.imageBuffer
        const hasPoster =
            Buffer.isBuffer(posterBuf) && posterBuf.length > 0

        let posterUrl = null
        if (hasPoster) {
            try {
                const posterFile = await storageService.uploadFile({
                    buffer: posterBuf,
                    filename: `${baseTitle}.${posterExtension(tags)}`,
                    folder: "/cohort-2/moodify/posters"
                })
                posterUrl = posterFile.url
            } catch (posterErr) {
                console.error("ImageKit poster upload failed:", posterErr.message || posterErr)
            }
        }

        const song = await songModel.create({
            title: baseTitle,
            url: songFile.url,
            posterUrl,
            mood
        })

        return res.status(201).json({
            message: "Song created sucessfully",
            song
        })
    } catch (err) {
        console.error("uploadSongController:", err.message || err)
        return res.status(502).json({
            message: "Could not upload file to storage. Check IMAGEKIT_PRIVATE_KEY and ImageKit dashboard limits.",
            detail: err.message || String(err)
        })
    }
}

async function getSong(req , res){
    const {mood} = req.body ; 
    const song = await songModel.findOne({
        mood
    })
    res.status(200).json({
        message : "song fetched sucessfully" , 
        song
    })
}

module.exports = {uploadSongController , getSong} ; 