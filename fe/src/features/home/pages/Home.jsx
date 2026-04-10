import React from "react";
import FaceExpression from "../../Expression/components/FaceDetector.jsx";
import Player from "../components/Player.jsx";
import { useSong } from "../hooks/useSong.js";

const Home = () => {
  const { handelGetSong, loading, song } = useSong();

  return (
    <div className="home">
      <FaceExpression
        onClick={(mood) => {
          if (typeof mood === "string") handelGetSong({ mood });
        }}
      />
      {loading && <p className="home__loading">Loading song…</p>}
      {!loading && !song && (
        <p className="home__hint">Use “Detect expression” to load a song for your mood.</p>
      )}
      <Player />
    </div>
  );
};

export default Home;