import { ThemeProvider } from "./components/theme-provider";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFoundPage from "./pages/errors/404";
import Rute from "./pages/Rute";
import Jadwal from "./pages/Jadwal";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="krl-ui-theme">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jalur" element={<Rute />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
