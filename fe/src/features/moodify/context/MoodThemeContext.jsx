/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { normalizeMood } from "../utils/mood";

const MoodThemeContext = createContext(null);

export function MoodThemeProvider({ children }) {
  const [mood, setMoodState] = useState("neutral");

  const setMood = useCallback((raw) => {
    setMoodState(normalizeMood(raw));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mood = mood;
  }, [mood]);

  const value = useMemo(() => ({ mood, setMood }), [mood, setMood]);

  return (
    <MoodThemeContext.Provider value={value}>
      {children}
    </MoodThemeContext.Provider>
  );
}

export function useMoodTheme() {
  const ctx = useContext(MoodThemeContext);
  if (!ctx) {
    throw new Error("useMoodTheme must be used within MoodThemeProvider");
  }
  return ctx;
}
