import type { VocabularyItem } from "../data/vocabulary";

interface FoodIllustrationProps {
  word: VocabularyItem;
}

const foodKinds: Record<string, string> = {
  "food-gohan": "rice",
  "food-mizu": "water",
  "food-ocha": "tea",
  "food-pan": "bread",
  "food-sakana": "fish",
  "food-niku": "meat",
  "food-yasai": "greens",
  "food-kudamono": "fruit-bowl",
  "fruit-ringo": "apple",
  "fruit-banana": "banana",
  "fruit-mikan": "orange",
  "fruit-ichigo": "strawberry",
  "fruit-budou": "grapes",
  "fruit-momo": "peach",
  "fruit-suika": "watermelon",
  "fruit-nashi": "pear",
  "veg-tomato": "tomato",
  "veg-kyuuri": "cucumber",
  "veg-ninjin": "carrot",
  "veg-tamanegi": "onion",
  "veg-jagaimo": "potato",
  "veg-kyabetsu": "cabbage",
  "veg-daikon": "radish",
  "veg-nasu": "eggplant",
};

const getKind = (word: VocabularyItem) => {
  if (foodKinds[word.id]) {
    return foodKinds[word.id];
  }

  if (word.category === "水果") {
    return "fruit-bowl";
  }

  if (word.category === "蔬菜") {
    return "greens";
  }

  if (word.category === "食物") {
    return "rice";
  }

  return null;
};

const FoodIllustration = ({ word }: FoodIllustrationProps) => {
  const kind = getKind(word);

  if (!kind) {
    return null;
  }

  return (
    <div
      className="mb-4 grid h-32 place-items-center overflow-hidden rounded-lg border border-black/8 bg-gradient-to-br from-rice via-white to-sky/70"
      aria-label={`${word.meaning} 插图`}
      role="img"
    >
      <svg viewBox="0 0 220 140" className="h-full w-full" aria-hidden="true">
        <defs>
          <filter id={`soft-shadow-${word.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#202236" floodOpacity="0.16" />
          </filter>
        </defs>
        <rect x="18" y="108" width="184" height="10" rx="5" fill="#202236" opacity="0.08" />
        {kind === "rice" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <ellipse cx="110" cy="72" rx="48" ry="28" fill="#ffffff" />
            <path d="M60 70h100l-15 42H75z" fill="#3E4B89" />
            <ellipse cx="110" cy="70" rx="50" ry="15" fill="#5160a1" />
            <circle cx="91" cy="56" r="5" fill="#ffffff" />
            <circle cx="111" cy="50" r="6" fill="#ffffff" />
            <circle cx="128" cy="58" r="5" fill="#ffffff" />
          </g>
        ) : null}
        {kind === "water" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M83 32h54l-9 84H92z" fill="#dff7ff" stroke="#3E4B89" strokeWidth="4" />
            <path d="M88 67h44l-5 44H93z" fill="#5bb7d7" opacity="0.72" />
            <circle cx="118" cy="48" r="5" fill="#ffffff" opacity="0.9" />
          </g>
        ) : null}
        {kind === "tea" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M70 62h82v18c0 22-17 38-41 38S70 102 70 80z" fill="#ffffff" stroke="#2F7D69" strokeWidth="4" />
            <path d="M150 70h15c8 0 13 5 13 12s-6 13-15 13h-11" fill="none" stroke="#2F7D69" strokeWidth="5" />
            <ellipse cx="111" cy="63" rx="42" ry="12" fill="#9ac7a1" />
            <path d="M92 42c-7-8 10-11 3-20M113 42c-6-8 11-12 4-21M134 42c-6-7 10-11 4-19" fill="none" stroke="#E15F4F" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : null}
        {kind === "bread" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M62 82c0-28 19-50 48-50s48 22 48 50v28H62z" fill="#D99043" />
            <path d="M70 82c0-21 16-40 40-40s40 19 40 40v19H70z" fill="#F5B84B" />
            <path d="M84 64c10 8 19 8 29 0M113 65c10 8 20 8 30 0" fill="none" stroke="#9b5a2f" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : null}
        {kind === "fish" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M65 72c23-30 60-30 88 0-28 30-65 30-88 0z" fill="#5bb7d7" />
            <path d="M153 72l32-23v46z" fill="#3E4B89" />
            <circle cx="90" cy="65" r="5" fill="#202236" />
            <path d="M113 49c8 11 8 35 0 46" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.75" />
          </g>
        ) : null}
        {kind === "meat" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M73 76c0-27 24-45 53-38 30 7 42 38 23 60-20 23-76 14-76-22z" fill="#E15F4F" />
            <path d="M92 69c11-14 34-15 47 0" fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" opacity="0.55" />
            <circle cx="84" cy="94" r="12" fill="#F5B84B" />
          </g>
        ) : null}
        {kind === "greens" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <ellipse cx="92" cy="80" rx="22" ry="44" fill="#2F7D69" transform="rotate(-25 92 80)" />
            <ellipse cx="126" cy="78" rx="24" ry="45" fill="#63a878" transform="rotate(25 126 78)" />
            <ellipse cx="110" cy="82" rx="26" ry="45" fill="#91bf75" />
            <path d="M110 44v73M90 62l22 24M133 61l-22 27" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.58" />
          </g>
        ) : null}
        {kind === "fruit-bowl" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <circle cx="81" cy="68" r="22" fill="#E15F4F" />
            <circle cx="111" cy="58" r="23" fill="#F5B84B" />
            <circle cx="140" cy="70" r="21" fill="#7fac62" />
            <path d="M58 80h104l-16 35H74z" fill="#3E4B89" />
            <ellipse cx="110" cy="80" rx="54" ry="13" fill="#5160a1" />
          </g>
        ) : null}
        {kind === "apple" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M110 55c-19-17-48-3-48 28 0 30 20 41 35 35 8-4 18-4 26 0 15 6 35-5 35-35 0-31-29-45-48-28z" fill="#E15F4F" />
            <path d="M112 54c4-22 18-26 33-24-7 16-18 24-33 24z" fill="#2F7D69" />
            <path d="M110 55c-2-12 3-22 13-29" stroke="#8a5b30" strokeWidth="5" strokeLinecap="round" />
          </g>
        ) : null}
        {kind === "banana" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M62 78c40 31 84 17 113-22-11 52-63 72-114 37z" fill="#F5B84B" />
            <path d="M62 78c40 31 84 17 113-22" fill="none" stroke="#9b6b22" strokeWidth="5" strokeLinecap="round" />
          </g>
        ) : null}
        {kind === "orange" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <circle cx="110" cy="78" r="43" fill="#F5B84B" />
            <path d="M98 39c8-13 23-13 34-5-9 8-21 10-34 5z" fill="#2F7D69" />
            <path d="M83 78h54M110 51v54M90 56c18 16 22 29 5 45M130 56c-18 16-22 29-5 45" stroke="#ffffff" strokeWidth="4" opacity="0.45" />
          </g>
        ) : null}
        {kind === "strawberry" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M110 38c36 0 51 27 34 54-9 15-25 28-34 35-9-7-25-20-34-35-17-27-2-54 34-54z" fill="#E15F4F" />
            <path d="M92 38l18 14 18-14M80 43l24 13M140 43l-24 13" stroke="#2F7D69" strokeWidth="8" strokeLinecap="round" />
            <g fill="#F8F5EF">
              <circle cx="96" cy="70" r="3" />
              <circle cx="119" cy="72" r="3" />
              <circle cx="110" cy="91" r="3" />
              <circle cx="132" cy="88" r="3" />
            </g>
          </g>
        ) : null}
        {kind === "grapes" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M109 42c8-12 24-15 35-9-10 11-20 14-35 9z" fill="#2F7D69" />
            {[
              [98, 62],
              [122, 62],
              [86, 84],
              [110, 84],
              [134, 84],
              [98, 106],
              [122, 106],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="15" fill="#6f4ca0" />
            ))}
          </g>
        ) : null}
        {kind === "peach" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M110 52c-26-22-58 1-49 35 8 31 36 41 49 41s41-10 49-41c9-34-23-57-49-35z" fill="#f39a87" />
            <path d="M111 51c6-15 18-21 34-19-8 15-21 21-34 19z" fill="#2F7D69" />
            <path d="M110 57c8 20 8 43 0 62" stroke="#E15F4F" strokeWidth="4" opacity="0.6" />
          </g>
        ) : null}
        {kind === "watermelon" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M52 94c14-44 102-44 116 0-28 32-88 32-116 0z" fill="#2F7D69" />
            <path d="M64 88c18-31 74-31 92 0-23 23-69 23-92 0z" fill="#E15F4F" />
            <path d="M68 95c28 22 56 22 84 0" fill="none" stroke="#ffffff" strokeWidth="6" />
            <g fill="#202236">
              <circle cx="91" cy="84" r="3" />
              <circle cx="112" cy="77" r="3" />
              <circle cx="132" cy="84" r="3" />
            </g>
          </g>
        ) : null}
        {kind === "pear" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M110 49c-13 0-22 13-18 27-20 7-28 24-22 42 8 22 72 22 80 0 6-18-2-35-22-42 4-14-5-27-18-27z" fill="#b8c96c" />
            <path d="M110 49c-1-10 4-17 12-22" stroke="#8a5b30" strokeWidth="5" strokeLinecap="round" />
          </g>
        ) : null}
        {kind === "tomato" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <circle cx="110" cy="82" r="43" fill="#E15F4F" />
            <path d="M110 42l10 18 20-7-11 18 16 13-22 1-5 22-11-19-22 8 12-20-16-12 21-2z" fill="#2F7D69" />
          </g>
        ) : null}
        {kind === "cucumber" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <rect x="53" y="61" width="114" height="39" rx="19" fill="#2F7D69" transform="rotate(-12 110 80)" />
            <circle cx="82" cy="79" r="4" fill="#91bf75" />
            <circle cx="113" cy="73" r="4" fill="#91bf75" />
            <circle cx="142" cy="67" r="4" fill="#91bf75" />
          </g>
        ) : null}
        {kind === "carrot" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M91 50c7-10 22-10 29 0l-15 75z" fill="#E9823E" />
            <path d="M105 49c-12-10-12-21-2-30M109 49c10-13 24-13 31-5M101 50c-18-1-24-10-21-23" stroke="#2F7D69" strokeWidth="7" strokeLinecap="round" />
            <path d="M95 76l18-5M91 95l16-5" stroke="#b95b2c" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : null}
        {kind === "onion" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M110 44c-34 20-41 72 0 82 41-10 34-62 0-82z" fill="#d6b9d9" />
            <path d="M110 44c-5-8-4-15 3-22" stroke="#2F7D69" strokeWidth="6" strokeLinecap="round" />
            <path d="M93 67c15 14 16 35 0 49M127 67c-15 14-16 35 0 49" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.45" />
          </g>
        ) : null}
        {kind === "potato" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M73 78c4-34 43-51 72-25 24 22 10 62-27 69-34 7-49-15-45-44z" fill="#c89355" />
            <g fill="#8a5b30" opacity="0.5">
              <circle cx="95" cy="75" r="4" />
              <circle cx="119" cy="64" r="4" />
              <circle cx="129" cy="95" r="4" />
              <circle cx="101" cy="103" r="4" />
            </g>
          </g>
        ) : null}
        {kind === "cabbage" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <circle cx="110" cy="82" r="44" fill="#91bf75" />
            <path d="M77 82c20-22 47-23 66 0M86 102c18-20 35-21 49 0M91 64c12 8 27 8 39 0" fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.55" />
          </g>
        ) : null}
        {kind === "radish" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M107 47c-30 14-33 63-2 82 32-18 32-68 2-82z" fill="#ffffff" stroke="#c9d5db" strokeWidth="3" />
            <path d="M107 48c-12-12-10-24 3-31M108 47c8-14 21-20 36-15M101 49c-18-7-27-18-24-32" stroke="#2F7D69" strokeWidth="7" strokeLinecap="round" />
          </g>
        ) : null}
        {kind === "eggplant" ? (
          <g filter={`url(#soft-shadow-${word.id})`}>
            <path d="M94 47c37 3 64 34 48 62-14 25-56 12-69-18-9-22 1-41 21-44z" fill="#5b3d8a" />
            <path d="M91 50c1-16 15-23 30-18" stroke="#2F7D69" strokeWidth="8" strokeLinecap="round" />
            <path d="M94 55c14 2 32 16 40 35" stroke="#ffffff" strokeWidth="5" opacity="0.32" strokeLinecap="round" />
          </g>
        ) : null}
      </svg>
    </div>
  );
};

export default FoodIllustration;
