import { ReactComponent as CheckBox } from "@/assets/icons/checkbox.svg";
import { ReactComponent as FilledCheckBox } from "@/assets/icons/filledCheckbox.svg";

export interface StartHubCheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const StartHubCheckBox = ({
  checked = false,
  onChange,
  disabled = false,
}: StartHubCheckBoxProps) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: disabled ? "not-allowed" : "pointer",
        height: "20px",
      }}
      aria-pressed={checked}
      aria-disabled={disabled}
    >
      {checked ? (
        <FilledCheckBox width={20} height={20} />
      ) : (
        <CheckBox width={20} height={20} />
      )}
    </button>
  );
};
