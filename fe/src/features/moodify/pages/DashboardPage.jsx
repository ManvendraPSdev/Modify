import { useEffect } from "react";
import FaceExpression from "../../Expression/components/FaceDetector.jsx";
import { useSong } from "../../home/hooks/useSong.js";
import { useMoodTheme } from "../context/MoodThemeContext";
import SongMoodGrid from "../components/SongMoodGrid.jsx";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { handelGetSong, loading, song } = useSong();
  const { setMood, mood } = useMoodTheme();

  useEffect(() => {
    if (song?.mood != null) setMood(song.mood);
  }, [song?.mood, setMood]);

  return (
    <>
      <div className="dashboard__hero">
        <motion.h1
          className="dashboard__title"
          layout
          key={mood}
          initial={{ opacity: 0.6, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          Your mood drives the mix
        </motion.h1>
        <p className="dashboard__subtitle">
          Scan your face or tap a mood — same detection and song API, now with a living MOODIFY
          canvas.
        </p>
      </div>

      <FaceExpression
        onClick={(rawMood) => {
          setMood(rawMood);
          if (typeof rawMood === "string") handelGetSong({ mood: rawMood });
        }}
      />

      {loading && <p className="dashboard__loading">Fetching your track…</p>}
      {!loading && !song && (
        <p className="dashboard__hint">
          Use “Detect expression” or choose a mood below to load music.
        </p>
      )}

      <SongMoodGrid
        currentSong={song}
        loading={loading}
        onPlayMood={({ mood: m }) => {
          setMood(m);
          handelGetSong({ mood: m });
        }}
      />
    </>
  );
}
