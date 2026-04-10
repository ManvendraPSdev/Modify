import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./features/Auth/pages/Register";
import Login from "./features/Auth/pages/Login";
import Protected from "./features/Auth/components/Protected";
import LandingPage from "./features/moodify/pages/LandingPage";
import MoodifyLayout from "./features/moodify/pages/MoodifyLayout";
import DashboardPage from "./features/moodify/pages/DashboardPage";
import UploadPage from "./features/moodify/pages/UploadPage";
import Navbar from "./features/moodify/components/Navbar";
import MoodBackground from "./features/moodify/components/MoodBackground";
import MoodParticles from "./features/moodify/components/MoodParticles";

function AppRoutes() {
  return (
    <BrowserRouter>
      <MoodBackground />
      <MoodParticles />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <Protected>
              <MoodifyLayout />
            </Protected>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
