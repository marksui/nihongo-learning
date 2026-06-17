import { formatRomajiReading } from "../utils/romaji";

interface AnimatedReadingProps {
  kana: string;
  romaji: string;
  active?: boolean;
  variant?: "light" | "dark";
}

const AnimatedReading = ({ kana, romaji, active = false, variant = "light" }: AnimatedReadingProps) => {
  const formattedRomaji = formatRomajiReading(romaji);
  const tokens = formattedRomaji.split(/(\s+)/);
  const kanaClass =
    variant === "dark"
      ? "text-white/80 data-[active=true]:text-yuzu"
      : "text-ink/58 data-[active=true]:text-matcha";
  const romajiClass =
    variant === "dark"
      ? "text-white/62 data-[active=true]:text-white"
      : "text-sumire/78 data-[active=true]:text-sumire";

  return (
    <div className="space-y-1" data-active={active}>
      <p
        className={`break-words text-sm font-semibold leading-6 transition-colors duration-300 ${kanaClass}`}
        data-active={active}
      >
        {kana}
      </p>
      <p
        className={`break-words font-reading text-sm font-semibold leading-6 transition-colors duration-300 ${romajiClass}`}
        data-active={active}
        aria-label={formattedRomaji}
      >
        {tokens.map((token, index) =>
          /^\s+$/.test(token) ? (
            token
          ) : (
            <span
              key={`${token}-${index}`}
              className={active ? "reading-token" : undefined}
              style={active ? { animationDelay: `${index * 52}ms` } : undefined}
            >
              {token}
            </span>
          ),
        )}
      </p>
    </div>
  );
};

export default AnimatedReading;
