import { Check, Palette } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { defaultThemeId, isThemeId, themes, themeStorageKey, type ThemeId } from "../data/themes";

const getInitialTheme = (): ThemeId => {
  if (typeof window === "undefined") {
    return defaultThemeId;
  }

  try {
    const savedTheme = window.localStorage?.getItem(themeStorageKey);
    return isThemeId(savedTheme) ? savedTheme : defaultThemeId;
  } catch {
    return defaultThemeId;
  }
};

const ThemeSwitcher = () => {
  const [themeId, setThemeId] = useState<ThemeId>(getInitialTheme);

  const activeTheme = useMemo(
    () => themes.find((theme) => theme.id === themeId) ?? themes[0],
    [themeId],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
    try {
      window.localStorage?.setItem(themeStorageKey, themeId);
    } catch {
      // Theme switching should keep working even when storage is unavailable.
    }
  }, [themeId]);

  return (
    <section className="nav-surface min-w-0 rounded-lg p-3" aria-labelledby="theme-title">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sora/12 text-sora">
            <Palette aria-hidden="true" size={19} />
          </span>
          <div className="min-w-0">
            <h2 id="theme-title" className="truncate text-base font-extrabold text-ink">主题</h2>
            <p className="truncate text-xs font-bold text-ink/52">{activeTheme.name}</p>
          </div>
        </div>

        <div className="flex h-8 w-24 shrink-0 overflow-hidden rounded-lg border border-ink/10" aria-label={`${activeTheme.name} 色板`}>
          {Object.values(activeTheme.colors).map((color) => (
            <span key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2" aria-label="主题颜色" role="group">
        {themes.map((theme) => {
          const active = theme.id === themeId;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setThemeId(theme.id)}
              aria-pressed={active}
              className={`tap-surface min-w-0 cursor-pointer rounded-lg border p-2 text-left transition active:scale-[0.99] ${
                active
                  ? "border-matcha bg-matcha text-white shadow-sm"
                  : "border-ink/10 bg-paper/60 text-ink hover:border-sora/25 hover:bg-rice"
              }`}
            >
              <span className="flex min-w-0 items-center justify-between gap-2">
                <span className="truncate text-sm font-extrabold">{theme.name}</span>
                {active ? <Check aria-hidden="true" className="shrink-0" size={15} /> : null}
              </span>
              <span className="mt-2 flex overflow-hidden rounded-md border border-ink/10">
                {Object.values(theme.colors)
                  .slice(1, 5)
                  .map((color) => (
                    <span
                      key={color}
                      className="h-3 flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ThemeSwitcher;
