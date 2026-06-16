export const themeStorageKey = "nihongo-learning-theme";

export const themes = [
  {
    id: "hidamari",
    name: "护眼日光",
    description: "温暖和纸色，适合长时间看假名和数字表。",
    colors: {
      ink: "#1B272A",
      rice: "#F2F7F0",
      paper: "#FFFDF7",
      sakura: "#D55870",
      matcha: "#2E805B",
      sora: "#3277A4",
      yuzu: "#E8B148",
      sumire: "#5D578F",
    },
  },
  {
    id: "matcha",
    name: "抹茶绿",
    description: "偏绿的柔和纸面，降低暖色疲劳。",
    colors: {
      ink: "#1D2F28",
      rice: "#EFF8EE",
      paper: "#FEFFFA",
      sakura: "#C75466",
      matcha: "#337E53",
      sora: "#3E819E",
      yuzu: "#D8A646",
      sumire: "#56608F",
    },
  },
  {
    id: "momo",
    name: "桃子暖色",
    description: "更温暖的浅桃纸色，适合低亮度屏幕。",
    colors: {
      ink: "#2F2728",
      rice: "#FFF6F1",
      paper: "#FFFDF9",
      sakura: "#CD5267",
      matcha: "#447C5B",
      sora: "#4980A9",
      yuzu: "#DEA54C",
      sumire: "#705A89",
    },
  },
  {
    id: "washi",
    name: "和纸灰",
    description: "低饱和米灰色，整体最安静。",
    colors: {
      ink: "#262A28",
      rice: "#F3F1E8",
      paper: "#FEFCF5",
      sakura: "#B75B68",
      matcha: "#467254",
      sora: "#467493",
      yuzu: "#BF9644",
      sumire: "#5B5B7A",
    },
  },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const defaultThemeId: ThemeId = "hidamari";

export const isThemeId = (value: string | null): value is ThemeId =>
  themes.some((theme) => theme.id === value);
