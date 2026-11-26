import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [light, setLight] = useState(true);

  useEffect(() => {
    let saved = false;
    try {
      const preference = localStorage.getItem("clinic-theme-v2");
      saved = preference === null ? true : preference === "light";
    } catch { /* Storage may be unavailable in private browsing. */ }
    setLight(saved);
    document.documentElement.classList.toggle("light", saved);
    document.documentElement.classList.toggle("dark", !saved);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    document.documentElement.classList.toggle("dark", !next);
    try {
      localStorage.setItem("clinic-theme-v2", next ? "light" : "dark");
    } catch { /* The toggle still works without persistent storage. */ }
  }

  const label = light ? "Ativar modo escuro" : "Ativar modo claro";
  return (
    <Button type="button" variant="ghost" size="icon" onClick={toggle} aria-label={label} title={label} className="glass h-11 w-11 shrink-0 rounded-full text-foreground">
      {light ? <Moon /> : <Sun />}
    </Button>
  );
}