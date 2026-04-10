import { Link } from "react-router";
import { motion } from "framer-motion";
import MoodOrbButtons from "../components/MoodOrbButtons";
import { useMoodTheme } from "../context/MoodThemeContext";

export default function LandingPage() {
  const { setMood } = useMoodTheme();

  return (
    <div className="landing">
      <motion.div
        className="landing__hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <p className="landing__brand">MOODIFY</p>
        <h1 className="landing__title">Feel Your Mood. Hear Your Music.</h1>
        <p className="landing__tagline">
          AI reads your expression and paints the world in one of three moods — Happy, Sad, or
          Surprised.
        </p>
      </motion.div>

      <div className="landing__orbs">
        <MoodOrbButtons
          layoutIdPrefix="landing-orb"
          onSelect={(m) => {
            setMood(m);
          }}
        />
      </div>

      <motion.div
        className="landing__cta-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link to="/register" className="landing__cta landing__cta--primary">
          Get started
        </Link>
        <Link to="/login" className="landing__cta landing__cta--ghost">
          I have an account
        </Link>
      </motion.div>
    </div>
  );
}
