import { motion } from "framer-motion";

export default function MoodBackground() {
  return (
    <div className="mood-background" aria-hidden>
      <motion.div
        className="mood-background__gradient"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
      />
      <div className="mood-background__mesh" />
    </div>
  );
}
