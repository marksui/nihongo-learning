export const themeStorageKey = "nihongo-learning-theme";

export const themes = [
  {
    id: "hidamari",
    name: "护眼日光",
    description: "淡黄色背景，适合长时间看假名和数字表。",
    colors: {
      ink: "#2B2418",
      rice: "#FFF4CF",
      paper: "#FFFDF1",
      sakura: "#D96F7E",
      matcha: "#4E8D61",
      sora: "#5D9BCB",
      yuzu: "#E9B949",
      sumire: "#74699A",
    },
  },
  {
    id: "matcha",
    name: "抹茶绿",
    description: "偏绿的柔和纸面，降低暖色疲劳。",
    colors: {
      ink: "#213626",
      rice: "#EDF7DE",
      paper: "#FBFFF1",
      sakura: "#CA7079",
      matcha: "#488752",
      sora: "#5691B1",
      yuzu: "#DCB348",
      sumire: "#696F91",
    },
  },
  {
    id: "momo",
    name: "桃子暖色",
    description: "更温暖的浅桃纸色，适合低亮度屏幕。",
    colors: {
      ink: "#432722",
      rice: "#FFEEDD",
      paper: "#FFFAF2",
      sakura: "#D26772",
      matcha: "#54845E",
      sora: "#5C8EB5",
      yuzu: "#E4AE55",
      sumire: "#80648F",
    },
  },
  {
    id: "washi",
    name: "和纸灰",
    description: "低饱和米灰色，整体最安静。",
    colors: {
      ink: "#242826",
      rice: "#F2EEDC",
      paper: "#FCFAEF",
      sakura: "#B26F74",
      matcha: "#527958",
      sora: "#567C99",
      yuzu: "#BE9D4F",
      sumire: "#646280",
    },
  },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

export const defaultThemeId: ThemeId = "hidamari";

export const isThemeId = (value: string | null): value is ThemeId =>
  themes.some((theme) => theme.id === value);
