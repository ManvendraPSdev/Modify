import { motion } from "framer-motion";

const ORBS = [
  { mood: "happy", label: "Happy", emoji: "\uD83D\uDE04", className: "mood-orb--happy" },
  { mood: "sad", label: "Sad", emoji: "\uD83D\uDE14", className: "mood-orb--sad" },
  { mood: "surprised", label: "Surprised", emoji: "\uD83D\uDE32", className: "mood-orb--surprised" },
];

export default function MoodOrbButtons({ onSelect, layoutIdPrefix = "orb" }) {
  return (
    <>
      {ORBS.map((o, i) => (
        <motion.button
          key={o.mood}
          type="button"
          className={`mood-orb ${o.className}`}
          onClick={() => onSelect?.(o.mood)}
          layoutId={`${layoutIdPrefix}-${o.mood}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.12 + i * 0.08,
            type: "spring",
            stiffness: 260,
            damping: 22,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="mood-orb__emoji">{o.emoji}</span>
          <span className="mood-orb__label">{o.label}</span>
        </motion.button>
      ))}
    </>
  );
}
