import { ChangeEventHandler, KeyboardEventHandler } from "react";

type InputType = "text" | "password" | "number" | "email";

export interface StartHubTextFieldProps {
  type: InputType;
  label?: string;
  detailLabel?: string;
  isError?: boolean;
  width?: number;
  name?: string;
  value: string;
  placeholder: string;
  isDisabled?: boolean;
  supportingText?: string;
  className?: string;
  autoComplete?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export const StartHubTextField = ({
  type,
  label,
  detailLabel,
  isError,
  width,
  name,
  value,
  placeholder,
  isDisabled,
  supportingText,
  className,
  autoComplete,
  onChange,
  onKeyDown,
}: StartHubTextFieldProps) => {
  return (
    <div
      className="flex flex-col relative"
      style={{ width: width ? `${width}px` : "100%" }}
    >
      {(label || detailLabel) && (
        <label
          htmlFor={name}
          className="font-pt-body1-medium text-hub-black-1 mb-3"
        >
          {label}
          {detailLabel && (
            <div className="font-pt-caption1-medium text-hub-primary text-sm">
              {detailLabel}
            </div>
          )}
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        autoComplete={autoComplete}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={[
          "px-5 h-[50px] rounded-lg outline-none font-pt-caption1-regular",
          "placeholder:text-hub-gray-3",
          isError
            ? "border border-hub-error focus:border-hub-error"
            : supportingText
            ? "border border-hub-gray-3 focus:border-hub-primary"
            : "border border-hub-gray-3 focus:border-hub-primary",
          isDisabled
            ? "bg-hub-white-2 text-hub-gray-3 cursor-not-allowed"
            : "bg-white",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {supportingText && (
        <span className="text-hub-error font-pt-caption1-regular text-[12px] mt-1 block">
          {supportingText}
        </span>
      )}
    </div>
  );
};
