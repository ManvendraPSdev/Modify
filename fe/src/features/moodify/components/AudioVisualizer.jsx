import { motion } from "framer-motion";

const BAR_COUNT = 12;

export default function AudioVisualizer({ active }) {
  return (
    <div className="audio-visualizer" aria-hidden>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <motion.div
          key={i}
          className="audio-visualizer__bar"
          style={{ height: 8, transformOrigin: "bottom center" }}
          animate={
            active
              ? {
                  scaleY: [0.35, 1, 0.5, 0.85, 0.4, 0.95],
                }
              : { scaleY: 0.25 }
          }
          transition={
            active
              ? {
                  duration: 0.9 + (i % 5) * 0.08,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: i * 0.05,
                }
              : { duration: 0.35 }
          }
        />
      ))}
    </div>
  );
}
