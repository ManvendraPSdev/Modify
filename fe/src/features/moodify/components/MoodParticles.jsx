import { motion } from "framer-motion";
import { useMemo } from "react";

const COUNT = 22;

export default function MoodParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 4 + (i % 5) * 2,
        delay: i * 0.08,
      })),
    []
  );

  return (
    <div className="mood-particles" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="mood-particles__dot"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
          }}
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.08, 0.28, 0.1] }}
          transition={{
            duration: 4 + (d.id % 5),
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
