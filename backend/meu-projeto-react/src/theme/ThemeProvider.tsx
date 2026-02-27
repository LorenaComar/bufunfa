import React, { createContext, useContext, useEffect, useMemo, useState } from "react";


type ThemeName = "light" | "dark";


type ThemeCtx = {
theme: ThemeName;
toggle: () => void;
setTheme: (t: ThemeName) => void;
};


const ThemeContext = createContext<ThemeCtx | null>(null);


function usePersistedTheme(): [ThemeName, (t: ThemeName) => void] {
const [value, setValue] = useState<ThemeName>(() => {
const fromStorage = (typeof window !== "undefined" && localStorage.getItem("bufunfa-theme")) as ThemeName | null;
return fromStorage ?? "dark";
});
useEffect(() => {
if (typeof window === "undefined") return;
document.documentElement.setAttribute("data-theme", value);
localStorage.setItem("bufunfa-theme", value);
}, [value]);
return [value, setValue];
}


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [theme, setTheme] = usePersistedTheme();
const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
const ctx = useMemo(() => ({ theme, toggle, setTheme }), [theme]);
return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>;
};


export function useTheme() {
const ctx = useContext(ThemeContext);
if (!ctx) throw new Error("useTheme deve ser usado dentro de <ThemeProvider>");
return ctx;
}