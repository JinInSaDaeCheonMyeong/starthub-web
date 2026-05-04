export interface ButtonProps {
  text: string;
  textTheme?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  hoverColor?: string;
}

export const StartHubButton = ({
  text,
  textTheme,
  width,
  height,
  backgroundColor = "var(--hub-primary)",
  onClick,
  disabled = false,
  className,
  icon,
  hoverColor,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        "border-none rounded-lg px-[22px] relative flex items-center",
        icon ? "justify-between" : "justify-center",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "48px",
        backgroundColor: disabled ? "var(--hub-gray-3)" : backgroundColor,
        color: disabled
          ? "var(--hub-gray-2)"
          : (textTheme ?? "var(--hub-white-1)"),
      }}
      onMouseEnter={(e) => {
        if (!disabled && hoverColor) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && hoverColor) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            disabled ? "#CFCFCF" : backgroundColor;
        }
      }}
    >
      {icon && (
        <span className="flex items-center absolute left-[22px]">{icon}</span>
      )}
      <span className="flex-1 text-center">{text}</span>
    </button>
  );
};
