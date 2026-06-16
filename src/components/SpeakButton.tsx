import { Volume2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

interface SpeakButtonProps {
  active?: boolean;
  ariaLabel: string;
  children?: ReactNode;
  className?: string;
  iconOnly?: boolean;
  icon?: LucideIcon;
  onClick?: () => Promise<unknown> | unknown;
  onSpeak?: (text: string) => Promise<boolean>;
  text?: string;
  title?: string;
  variant?: "solid" | "soft" | "light" | "dark";
}

const variantClasses = {
  solid: "bg-matcha text-white hover:bg-matcha/90",
  soft: "border border-matcha/25 bg-matcha/10 text-matcha hover:bg-matcha hover:text-white",
  light: "border border-ink/10 bg-paper text-matcha shadow-sm hover:bg-matcha hover:text-white",
  dark: "bg-white/12 text-white hover:bg-white/22",
};

const SpeakButton = ({
  active = false,
  ariaLabel,
  children,
  className = "",
  iconOnly = true,
  icon: Icon = Volume2,
  onClick,
  onSpeak,
  text,
  title = "播放",
  variant = "solid",
}: SpeakButtonProps) => {
  const [localActive, setLocalActive] = useState(false);
  const speaking = active || localActive;

  const handleClick = async () => {
    setLocalActive(true);

    try {
      if (onClick) {
        await onClick();
      } else if (onSpeak && text) {
        await onSpeak(text);
      }
    } finally {
      window.setTimeout(() => setLocalActive(false), 520);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`tap-surface cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-extrabold transition active:scale-95 ${
        iconOnly ? "grid h-11 w-11 shrink-0 place-items-center sm:h-10 sm:w-10" : "flex min-h-11 px-3 py-2"
      } ${variantClasses[variant]} ${speaking ? "speak-button-active ring-2 ring-yuzu/40" : ""} ${className}`}
      aria-label={ariaLabel}
      title={title}
    >
      <Icon aria-hidden="true" size={iconOnly ? 19 : 17} />
      {iconOnly ? null : children}
    </button>
  );
};

export default SpeakButton;
