import { Link, NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAuth } from "../../Auth/hooks/useAuth";
import { useMoodTheme } from "../context/MoodThemeContext";

export default function Navbar() {
  const { user, handelLogout } = useAuth();
  const navigate = useNavigate();
  const { mood } = useMoodTheme();

  async function onLogout() {
    await handelLogout();
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    `moodify-nav__link ${isActive ? "moodify-nav__link--active" : ""}`;

  return (
    <motion.header
      className="moodify-nav"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link to="/" className="moodify-nav__brand">
        <span className="moodify-nav__logo">M</span>
        <span>MOODIFY</span>
        <span className="moodify-nav__mood-dot" title={`Mood: ${mood}`} />
      </Link>

      <nav className="moodify-nav__links" aria-label="Main">
        <NavLink to="/app" end className={linkClass}>
          Listen
        </NavLink>
        <NavLink to="/app/upload" className={linkClass}>
          Upload
        </NavLink>
      </nav>

      <div className="moodify-nav__actions">
        {user ? (
          <button
            type="button"
            className="moodify-nav__btn moodify-nav__btn--ghost"
            onClick={onLogout}
          >
            Log out
          </button>
        ) : (
          <>
            <Link to="/login" className="moodify-nav__btn moodify-nav__btn--ghost">
              Log in
            </Link>
            <Link to="/register" className="moodify-nav__btn moodify-nav__btn--primary">
              Join
            </Link>
          </>
        )}
      </div>
    </motion.header>
  );
}
