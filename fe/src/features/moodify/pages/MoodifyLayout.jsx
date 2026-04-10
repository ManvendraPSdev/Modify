import { Outlet } from "react-router";
import Player from "../../home/components/Player.jsx";

export default function MoodifyLayout() {
  return (
    <div className="moodify-layout">
      <main className="moodify-layout__main">
        <Outlet />
      </main>
      <Player />
    </div>
  );
}
