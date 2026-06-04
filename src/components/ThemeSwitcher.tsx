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
    <section className="min-w-0 rounded-lg border border-ink/8 bg-paper/94 p-4 shadow-card" aria-labelledby="theme-title">
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-start">
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h2 id="theme-title" className="flex items-center gap-2 text-base font-extrabold text-ink">
              <Palette aria-hidden="true" className="text-matcha" size={19} />
              主题
            </h2>
            <span className="rounded-md bg-rice px-2 py-1 text-xs font-bold text-ink/62">{activeTheme.name}</span>
          </div>

          <div className="mt-3 flex overflow-hidden rounded-md border border-ink/10" aria-label={`${activeTheme.name} 色板`}>
            {Object.values(activeTheme.colors).map((color) => (
              <span key={color} className="h-7 flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div className="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {themes.map((theme) => {
            const active = theme.id === themeId;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setThemeId(theme.id)}
                aria-pressed={active}
                className={`flex min-h-12 min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-2 text-left transition active:scale-[0.99] ${
                  active
                    ? "border-matcha bg-matcha text-white shadow-card"
                    : "border-ink/10 bg-rice/35 text-ink hover:border-matcha/25 hover:bg-rice/65"
                }`}
              >
                <span className="min-w-0 break-words text-sm font-extrabold leading-5">{theme.name}</span>
                <span className="flex shrink-0 items-center gap-1">
                  {Object.values(theme.colors)
                    .slice(1, 5)
                    .map((color) => (
                      <span
                        key={color}
                        className="h-4 w-4 rounded border border-ink/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  {active ? <Check aria-hidden="true" size={18} /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThemeSwitcher;
