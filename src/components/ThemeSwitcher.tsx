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
    <section className="min-w-0" aria-labelledby="theme-title">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Palette aria-hidden="true" className="shrink-0 text-sora" size={18} />
          <h2 id="theme-title" className="truncate text-sm font-extrabold text-ink">
            主题颜色
          </h2>
        </div>
        <div className="flex h-7 w-24 shrink-0 overflow-hidden rounded-md border border-ink/10" aria-label={`${activeTheme.name} 色板`}>
          {Object.values(activeTheme.colors).map((color) => (
            <span key={color} className="flex-1" style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>

      <div className="filter-scroll-row -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="主题颜色" role="group">
        {themes.map((theme) => {
          const active = theme.id === themeId;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setThemeId(theme.id)}
              aria-pressed={active}
              className={`tap-surface flex shrink-0 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-extrabold transition active:scale-[0.99] ${
                active
                  ? "border-ink bg-ink text-white shadow-sm"
                  : "border-ink/10 bg-paper/60 text-ink/68 hover:border-sora/25 hover:bg-rice hover:text-ink"
              }`}
            >
              <span className="flex h-5 w-9 overflow-hidden rounded border border-ink/10">
                {Object.values(theme.colors)
                  .slice(1, 4)
                  .map((color) => (
                    <span
                      key={color}
                      className="h-full flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
              </span>
              <span>{theme.name}</span>
              {active ? <Check aria-hidden="true" className="shrink-0" size={15} /> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ThemeSwitcher;
