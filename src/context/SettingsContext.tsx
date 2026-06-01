import { createContext, useContext, useEffect, useReducer, ReactNode, Dispatch } from "react";
import { initialSettings, settingsReducer, SettingsState, SettingsAction } from "./settingsReducer";

const STORAGE_KEY = "farzana-settings";

interface SettingsContextValue {
  state: SettingsState;
  dispatch: Dispatch<SettingsAction>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const loadSettings = (): SettingsState => {
  if (typeof window === "undefined") return initialSettings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialSettings, ...JSON.parse(raw) } : initialSettings;
  } catch {
    return initialSettings;
  }
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialSettings, loadSettings);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    const root = document.documentElement;
    if (state.theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [state]);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
};
