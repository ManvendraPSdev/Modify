const { Blob } = require("node:buffer")

const UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload"

/**
 * ImageKit fileName rules: only a-z, A-Z, 0-9, ".", "-". Other chars can break uploads.
 * @see https://imagekit.io/docs/api-reference/upload-file/upload-file
 */
function safeImageKitFileName(filename) {
    const s = String(filename)
        .replace(/[^a-zA-Z0-9.-]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    const out = s || "file"
    return out.length > 180 ? out.slice(0, 180) : out
}

function basicAuthHeader(privateKey) {
    const token = Buffer.from(`${privateKey}:`, "utf8").toString("base64")
    return `Basic ${token}`
}

async function uploadFile({ buffer, filename, folder = "" }) {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    if (!privateKey || !String(privateKey).trim()) {
        throw new Error("IMAGEKIT_PRIVATE_KEY is missing or empty")
    }

    const fileName = safeImageKitFileName(filename)
    const buf = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer)

    const form = new FormData()
    form.append("file", new Blob([buf]), fileName)
    form.append("fileName", fileName)
    form.append("useUniqueFileName", "true")
    if (folder) {
        form.append("folder", folder)
    }

    const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
            Authorization: basicAuthHeader(privateKey.trim())
        },
        body: form
    })

    const text = await res.text()
    let data
    try {
        data = JSON.parse(text)
    } catch {
        throw new Error(`ImageKit upload failed (${res.status}): ${text.slice(0, 400)}`)
    }

    if (!res.ok) {
        const msg =
            (typeof data.message === "string" && data.message) ||
            (typeof data.error === "string" && data.error) ||
            text.slice(0, 400)
        throw new Error(`ImageKit ${res.status}: ${msg}`)
    }

    return data
}

module.exports = { uploadFile }
