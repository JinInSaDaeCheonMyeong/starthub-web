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
    if (!disabled && onChange) onChange(!checked);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={checked}
      aria-disabled={disabled}
      className="bg-transparent border-none p-0 h-5 disabled:cursor-not-allowed cursor-pointer"
    >
      {checked ? (
        <FilledCheckBox width={20} height={20} />
      ) : (
        <CheckBox width={20} height={20} />
      )}
    </button>
  );
};
