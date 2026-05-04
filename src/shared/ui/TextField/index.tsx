import { ChangeEventHandler, KeyboardEventHandler } from "react";

type InputType = "text" | "password" | "number";

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
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={[
          "px-5 h-[50px] rounded-lg outline-none font-pt-caption1-regular",
          "placeholder:text-hub-gray-3",
          isError
            ? "border border-hub-error focus:border-hub-error mb-0"
            : "border border-hub-gray-3 focus:border-hub-primary mb-[10px]",
          isDisabled
            ? "bg-hub-white-2 text-hub-gray-3 cursor-not-allowed"
            : "bg-white",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {supportingText && (
        <span className="text-hub-error font-pt-body2-regular text-[13px] pb-[10px]">
          {supportingText}
        </span>
      )}
    </div>
  );
};
