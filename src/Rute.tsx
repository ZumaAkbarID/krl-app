import { ThemeProvider } from "./components/theme-provider";
import RutePage from "./pages/Rute";

function Rute() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RutePage />
    </ThemeProvider>
  );
}

export default Rute;
