import { api } from "../../../lib/api.js";

export async function getSong({ mood }) {
  const response = await api.get("/api/song?mood=" + mood);
  return response.data;
}

export async function uploadSong({ file, mood }) {
  const formData = new FormData();
  formData.append("song", file);
  formData.append("mood", mood);
  const response = await api.post("/api/song/", formData);
  return response.data;
}
