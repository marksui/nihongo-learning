import { Check } from "lucide-react";
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
    <section className="min-w-0 rounded-lg border border-ink/8 bg-paper/92 p-3 shadow-card sm:p-4" aria-labelledby="theme-title">
      <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 id="theme-title" className="truncate text-base font-extrabold text-ink">主题</h2>
          <p className="truncate text-xs font-bold text-ink/52">{activeTheme.name}</p>
        </div>
        <div className="flex h-7 w-32 shrink-0 overflow-hidden rounded-md border border-ink/10 sm:w-40" aria-label={`${activeTheme.name} 色板`}>
          {Object.values(activeTheme.colors).map((color) => (
            <span key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end" aria-label="主题颜色" role="group">
        {themes.map((theme) => {
          const active = theme.id === themeId;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setThemeId(theme.id)}
              aria-pressed={active}
              className={`tap-surface flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md border px-2.5 py-1.5 text-left transition active:scale-[0.99] sm:min-w-[8.5rem] ${
                active
                  ? "border-matcha bg-matcha text-white shadow-card"
                  : "border-ink/10 bg-rice/35 text-ink hover:border-matcha/25 hover:bg-rice/65"
              }`}
            >
              <span className="truncate text-sm font-extrabold leading-5">{theme.name}</span>
              <span className="flex shrink-0 items-center gap-1">
                {Object.values(theme.colors)
                  .slice(1, 5)
                  .map((color) => (
                    <span
                      key={color}
                      className="h-3.5 w-3.5 rounded border border-ink/10"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                {active ? <Check aria-hidden="true" size={16} /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ThemeSwitcher;
