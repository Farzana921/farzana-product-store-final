export type Theme = "light" | "dark";
export type View = "grid" | "list";

export interface SettingsState {
  theme: Theme;
  view: View;
  category: string;
}

export type SettingsAction =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "SET_VIEW"; payload: View }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "RESET_SETTINGS" };

export const initialSettings: SettingsState = {
  theme: "light",
  view: "grid",
  category: "all",
};

export const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case "SET_THEME": return { ...state, theme: action.payload };
    case "SET_VIEW": return { ...state, view: action.payload };
    case "SET_CATEGORY": return { ...state, category: action.payload };
    case "RESET_SETTINGS": return initialSettings;
    default: return state;
  }
};
