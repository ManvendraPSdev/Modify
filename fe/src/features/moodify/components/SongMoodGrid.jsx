import { motion } from "framer-motion";
import { MOOD_KEYS, MOOD_LABELS } from "../utils/mood";

const EMOJI = { happy: "\uD83D\uDE04", sad: "\uD83D\uDE14", surprised: "\uD83D\uDE32" };

export default function SongMoodGrid({ currentSong, onPlayMood, loading }) {
  return (
    <section className="song-grid-section">
      <h2 className="song-grid-section__title">
        <span>Moods</span>
        <span aria-hidden> · </span>
        <span style={{ color: "var(--mood-primary)" }}>pick a vibe</span>
      </h2>
      <div className="song-grid">
        {MOOD_KEYS.map((mood, i) => {
          const isActive =
            currentSong && String(currentSong.mood).toLowerCase() === mood;
          const showImg = isActive && Boolean(currentSong?.posterUrl);

          return (
            <motion.article
              key={mood}
              className={`song-card ${isActive ? "song-card--active" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.4 }}
              whileHover={{ y: -4 }}
              onClick={() => !loading && onPlayMood({ mood })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!loading) onPlayMood({ mood });
                }
              }}
            >
              <div className="song-card__poster-wrap">
                {showImg ? (
                  <img className="song-card__poster" src={currentSong.posterUrl} alt="" />
                ) : (
                  <div
                    className="song-card__poster"
                    style={{
                      background: `linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                    }}
                  >
                    {EMOJI[mood]}
                  </div>
                )}
                <div className="song-card__overlay" aria-hidden>
                  <span className="song-card__play">
                    {loading ? "…" : "▶"}
                  </span>
                </div>
              </div>
              <div className="song-card__meta">
                <span className="song-card__mood-tag">{MOOD_LABELS[mood]}</span>
                <p className="song-card__title">
                  {isActive && currentSong?.title ? currentSong.title : `Play ${MOOD_LABELS[mood]} mix`}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
