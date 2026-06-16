export const themeStorageKey = "nihongo-learning-theme";

export const themes = [
  {
    id: "hidamari",
    name: "护眼日光",
    description: "温暖和纸色，适合长时间看假名和数字表。",
    colors: {
      ink: "#1F2428",
      rice: "#F6F6EE",
      paper: "#FFFFFA",
      sakura: "#DA5B70",
      matcha: "#378158",
      sora: "#3681B0",
      yuzu: "#E8B040",
      sumire: "#69639A",
    },
  },
  {
    id: "matcha",
    name: "抹茶绿",
    description: "偏绿的柔和纸面，降低暖色疲劳。",
    colors: {
      ink: "#1E3025",
      rice: "#ECF4E2",
      paper: "#FCFFF4",
      sakura: "#C86270",
      matcha: "#377F4F",
      sora: "#4E8BAA",
      yuzu: "#D9AD47",
      sumire: "#606994",
    },
  },
  {
    id: "momo",
    name: "桃子暖色",
    description: "更温暖的浅桃纸色，适合低亮度屏幕。",
    colors: {
      ink: "#3C2925",
      rice: "#FFEFE4",
      paper: "#FFFCF6",
      sakura: "#D05C6C",
      matcha: "#4C815B",
      sora: "#5489B0",
      yuzu: "#DFA74C",
      sumire: "#7A608E",
    },
  },
  {
    id: "washi",
    name: "和纸灰",
    description: "低饱和米灰色，整体最安静。",
    colors: {
      ink: "#242826",
      rice: "#F1EEE1",
      paper: "#FCFAF2",
      sakura: "#B8646C",
      matcha: "#4B7456",
      sora: "#4C7795",
      yuzu: "#BE9943",
      sumire: "#5C5C7D",
    },
  },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const defaultThemeId: ThemeId = "hidamari";

export const isThemeId = (value: string | null): value is ThemeId =>
  themes.some((theme) => theme.id === value);
