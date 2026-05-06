import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { ReactComponent as Search } from "@assets/icons/search.svg";

export interface StartHubSearchBarProps {
  value: string;
  placeholder?: string;
  width?: number;
  isDisabled?: boolean;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export const StartHubSearchBar = ({
  value,
  placeholder = "검색어를 입력하세요",
  width,
  isDisabled,
  className,
  onChange,
  onKeyDown,
}: StartHubSearchBarProps) => {
  return (
    <div
      className={[
        "flex items-center relative border border-hub-gray-3 rounded-lg px-5 h-10 focus-within:border-hub-primary",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: width ? `${width}px` : "100%" }}
    >
      <Search className="w-5 h-5 mr-3 shrink-0" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={[
          "font-pt-caption1-regular border-none outline-none w-full bg-transparent",
          "placeholder:text-hub-gray-3",
          isDisabled ? "text-hub-gray-3 cursor-not-allowed" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
};
