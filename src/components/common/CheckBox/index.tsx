import { ReactComponent as CheckBox } from '../../../assets/icon/checkbox.svg';
import { ReactComponent as FilledCheckBox } from '../../../assets/icon/filledCheckbox.svg';

export interface StartHubCheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function StartHubCheckBox({
  checked = false,
  onChange,
  disabled = false,
}: StartHubCheckBoxProps) {
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
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      aria-pressed={checked}
      aria-disabled={disabled}
    >
      {checked ? <FilledCheckBox /> : <CheckBox />}
    </button>
  );
}
