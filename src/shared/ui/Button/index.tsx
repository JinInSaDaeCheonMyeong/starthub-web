export interface ButtonProps {
  text: string;
  textTheme?: string;
  width?: number;
  height?: number;
  backgroundColor: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  hoverColor?: string;
  type?: "button" | "submit" | "reset";
}

export const StartHubButton = ({
  text,
  textTheme,
  width,
  height,
  backgroundColor,
  onClick,
  disabled = false,
  className,
  icon,
  hoverColor,
  type = "button",
}: ButtonProps) => {
  const dynamicStyle = {
    ...(width && { width: `${width}px` }),
    ...(height && { height: `${height}px` }),
    backgroundColor: disabled ? "#CFCFCF" : backgroundColor,
    color: disabled ? "#9B9B9B" : (textTheme || "#FFFFFF"),
  };

  return (
    <button
      type={type}
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
      style={dynamicStyle}
      onMouseEnter={(e) => {
        if (!disabled && hoverColor) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && hoverColor) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor =
            disabled ? "#CFCFCF" : (backgroundColor || "");
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
