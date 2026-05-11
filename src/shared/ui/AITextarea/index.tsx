import React from "react";
import { ReactComponent as PlusIcon } from "@/assets/icons/chatbot-plus.svg";
import { ReactComponent as ArrowIcon } from "@/assets/icons/chatbot-up.svg";
import { useAITextarea } from "@/shared/hooks/AITextarea/useAITextarea";

export interface AITextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (text: string, files?: File[]) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  maxWidth?: string;
  className?: string;
  compact?: boolean;
}

const StartHubAITextarea = ({
  value,
  onChange,
  onSubmit,
  placeholder = "무엇이든 부탁하세요",
  rows = 1,
  disabled = false,
  maxWidth = "100%",
  className,
  compact = false,
}: AITextareaProps) => {
  const {
    taRef,
    composing,
    expanded,
    currentValue,
    setValue,
    syncAutoSize,
    handleSubmit,
    handleKeyDown,
    fileInputRef,
    openFilePicker,
    handleFileInput,
    files,
    removeFile,
  } = useAITextarea({
    value,
    onChange: (v) => {
      if (onChange) {
        const fakeEvent = {
          target: { value: v },
        } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(fakeEvent);
      }
    },
    onSubmit,
  });

  return (
    <div
      className={`flex flex-col gap-2 w-full ${className ?? ""}`}
      style={{ maxWidth }}
    >
      {/* 파일 칩 목록 */}
      {files.length > 0 && (
        <div className="flex gap-2 items-center w-full py-2 overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {files.map((f, i) => (
            <div
              key={`${f.name}-${(f as File).lastModified}-${i}`}
              className={[
                "inline-flex items-center flex-[0_0_auto] border border-hub-gray-3 backdrop-blur-xl font-pt-body2-regular text-hub-gray-2",
                compact
                  ? "gap-[6px] px-2 py-[6px] rounded-[10px] text-[13px] max-w-[160px]"
                  : "gap-[10px] px-3 py-2 rounded-xl max-w-[230px]",
              ].join(" ")}
            >
              <span
                className="overflow-hidden text-ellipsis inline-block"
                title={f.name}
              >
                {f.name}
              </span>
              <button
                onClick={() => removeFile(i)}
                className="p-1 rounded-md cursor-pointer bg-transparent border-none outline-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 입력 영역 */}
      <div
        className={[
          "relative w-full flex border overflow-visible transition-all duration-[160ms] ease-in-out",
          disabled
            ? "border-gray-300 bg-gray-100 opacity-70"
            : "border-hub-gray-3 bg-hub-white-1 focus-within:border-hub-primary",
          expanded
            ? "items-start px-[18px] pt-[18px] pb-7 rounded-2xl min-h-[160px] h-auto"
            : "items-center px-14 rounded-full h-[50px]",
        ].join(" ")}
      >
        {/* 파일 첨부 버튼 */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,image/png,image/jpeg,image/gif,image/webp"
          onChange={handleFileInput}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => {
            if (!disabled) openFilePicker();
          }}
          aria-hidden
          disabled={disabled}
          className={[
            "absolute left-3 w-10 h-10 flex items-center justify-center rounded-full z-[3] bg-transparent border-none outline-none transition-all duration-[160ms] ease-in-out",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            expanded ? "top-auto bottom-[18px]" : "top-1/2 -translate-y-1/2",
          ].join(" ")}
        >
          <PlusIcon />
        </button>

        {/* 텍스트에어리어 */}
        <textarea
          ref={(el) => {
            taRef.current = el;
          }}
          value={currentValue}
          onChange={(e) => {
            const el = e.target as HTMLTextAreaElement;
            setValue(el.value);
            if (onChange) onChange(e);
            syncAutoSize(el);
          }}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => (composing.current = true)}
          onCompositionEnd={() => (composing.current = false)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          className="w-full box-border font-pt-body2-regular text-hub-black-1 caret-hub-primary bg-transparent border-none resize-none overflow-hidden focus:outline-none focus:shadow-none placeholder:text-hub-gray-2"
          style={{ resize: "none", overflow: "hidden" }}
        />

        {/* 전송 버튼 */}
        <button
          onClick={() => {
            if (!disabled) handleSubmit();
          }}
          aria-label="send"
          disabled={disabled}
          className={[
            "absolute right-3 w-10 h-10 flex items-center justify-center rounded-full z-[3] cursor-pointer bg-[rgba(36,102,244,0.12)] border-none outline-none transition-all duration-[160ms] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
            expanded ? "top-auto bottom-[18px]" : "top-1/2 -translate-y-1/2",
          ].join(" ")}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default StartHubAITextarea;
