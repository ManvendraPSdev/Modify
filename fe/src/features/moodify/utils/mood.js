/** Map API / detector strings to theme keys (only 3 moods + neutral). */
export function normalizeMood(raw) {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (s === "happy") return "happy";
  if (s === "sad") return "sad";
  if (s === "surprised") return "surprised";
  return "neutral";
}

export const MOOD_KEYS = ["happy", "sad", "surprised"];

export const MOOD_LABELS = {
  happy: "Happy",
  sad: "Sad",
  surprised: "Surprised",
};
