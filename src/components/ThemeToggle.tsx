import { useSettings } from "@/context/SettingsContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const { state, dispatch } = useSettings();
  const next = state.theme === "light" ? "dark" : "light";
  return (
    <button
      onClick={() => dispatch({ type: "SET_THEME", payload: next })}
      aria-label="Toggle theme"
      className="rounded-full p-2 hover:bg-secondary"
    >
      {state.theme === "light" ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
