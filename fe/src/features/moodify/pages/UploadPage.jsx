import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { uploadSong } from "../../home/services/song.api.js";
import { useMoodTheme } from "../context/MoodThemeContext";
import { MOOD_KEYS, MOOD_LABELS } from "../utils/mood";

export default function UploadPage() {
  const { setMood } = useMoodTheme();
  const [file, setFile] = useState(null);
  const [mood, setMoodLocal] = useState("happy");
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer?.files?.[0];
    if (f && f.type.startsWith("audio/")) setFile(f);
  }, []);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!file) {
      setStatus({ type: "error", text: "Choose an audio file first." });
      return;
    }
    setSubmitting(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await uploadSong({ file, mood });
      setMood(mood);
      setStatus({
        type: "ok",
        text: res?.message ?? "Upload complete.",
      });
      setFile(null);
    } catch (err) {
      setStatus({
        type: "error",
        text: err?.response?.data?.message ?? err?.message ?? "Upload failed.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="upload-page">
      <motion.h1
        className="upload-page__title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Upload a track
      </motion.h1>
      <p className="upload-page__subtitle">
        Drop an MP3 (or audio) file, tag it with one of the three moods — same API as before.
      </p>

      <form onSubmit={onSubmit}>
        <div
          className={`upload-drop ${drag ? "upload-drop--active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
        >
          <div className="upload-drop__icon">♪</div>
          <p className="upload-drop__text">{file ? file.name : "Drag & drop audio here"}</p>
          <p className="upload-drop__hint">or choose a file from your device</p>
          <label className="upload-drop__browse">
            Browse files
            <input
              type="file"
              accept="audio/*,.mp3"
              className="upload-drop__input"
              onChange={onFile}
            />
          </label>
        </div>

        <div className="upload-moods">
          <span className="upload-moods__label">Mood</span>
          <div className="upload-moods__row">
            {MOOD_KEYS.map((k) => (
              <button
                key={k}
                type="button"
                className={`upload-mood-btn upload-mood-btn--${k} ${
                  mood === k ? "upload-mood-btn--selected" : ""
                }`}
                onClick={() => {
                  setMoodLocal(k);
                  setMood(k);
                }}
              >
                {MOOD_LABELS[k]}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="upload-submit" disabled={submitting}>
          {submitting ? "Uploading…" : "Upload to MOODIFY"}
        </button>

        {status.text && (
          <p
            className={`upload-status upload-status--${status.type === "error" ? "error" : "ok"}`}
          >
            {status.text}
          </p>
        )}
      </form>
    </div>
  );
}
