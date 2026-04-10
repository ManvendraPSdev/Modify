import AppRoutes from "./app.routes";
import { AuthProvider } from "./features/Auth/auth.context";
import { SongContextProvider } from "./features/home/song.context";
import { MoodThemeProvider } from "./features/moodify/context/MoodThemeContext";
import "./styles/main.scss";

function App() {
  return (
    <MoodThemeProvider>
      <AuthProvider>
        <SongContextProvider>
          <AppRoutes />
        </SongContextProvider>
      </AuthProvider>
    </MoodThemeProvider>
  );
}

export default App;
