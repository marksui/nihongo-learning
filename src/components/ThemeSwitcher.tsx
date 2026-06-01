import { Check, Palette } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { defaultThemeId, isThemeId, themes, themeStorageKey, type ThemeId } from "../data/themes";

const colorLabels = {
  ink: "文字",
  rice: "背景",
  paper: "纸面",
  sakura: "重点",
  matcha: "朗读",
  sora: "信息",
  yuzu: "高亮",
  sumire: "辅助",
};

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
    <section className="rounded-lg border border-ink/10 bg-paper p-4 shadow-card" aria-labelledby="theme-title">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-yuzu/18 text-ink">
          <Palette aria-hidden="true" size={21} />
        </div>
        <div className="min-w-0">
          <h2 id="theme-title" className="text-base font-extrabold text-ink">
            主题颜色
          </h2>
          <p className="mt-1 text-sm leading-6 text-ink/68">{activeTheme.description}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8" aria-label={`${activeTheme.name} 色板`}>
        {Object.entries(activeTheme.colors).map(([key, color]) => (
          <div key={key} className="min-w-0 rounded-md border border-ink/10 bg-rice/40 p-2">
            <div className="h-8 rounded border border-ink/10" style={{ backgroundColor: color }} />
            <p className="mt-1 truncate text-xs font-bold text-ink/62">
              {colorLabels[key as keyof typeof colorLabels]}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {themes.map((theme) => {
          const active = theme.id === themeId;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setThemeId(theme.id)}
              aria-pressed={active}
              className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-md border px-3 py-2 text-left transition active:scale-[0.99] ${
                active
                  ? "border-matcha bg-matcha text-white shadow-card"
                  : "border-ink/10 bg-paper text-ink hover:border-yuzu/45 hover:bg-yuzu/10"
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-extrabold">{theme.name}</span>
                <span className={`mt-0.5 block truncate text-xs ${active ? "text-white/72" : "text-ink/55"}`}>
                  {theme.id}
                </span>
              </span>
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
    </section>
  );
};

export default ThemeSwitcher;
