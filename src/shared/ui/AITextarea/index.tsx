import React from "react";
import * as S from "./style";
import { ReactComponent as PlusIcon } from "@/assets/icons/chatbot-plus.svg";
import { ReactComponent as ArrowIcon } from "@/assets/icons/chatbot-up.svg";
import useAITextarea from "@/shared/hooks/AITextarea/useAITextarea";

export interface AITextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (text: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  maxWidth?: string;
  className?: string;
}

const AITextarea = ({
  value,
  onChange,
  onSubmit,
  placeholder = "무엇이든 부탁하세요",
  rows = 1,
  disabled = false,
  maxWidth = "100%",
  className,
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
    <S.Container style={{ maxWidth }} className={className}>
      {files.length > 0 ? (
        <S.FileRow>
          {files.map((f, i) => (
            <S.FileChip key={i}>
              <span title={f.name}>{f.name}</span>
              <S.FileRemove onClick={() => removeFile(i)}>×</S.FileRemove>
            </S.FileChip>
          ))}
        </S.FileRow>
      ) : null}

      <S.InputWrapper $expanded={expanded}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          style={{ display: "none" }}
        />

        <S.IconBadge
          as="button"
          type="button"
          left
          $expanded={expanded}
          aria-hidden
          onClick={() => openFilePicker()}
        >
          <PlusIcon />
        </S.IconBadge>

        <S.Textarea
          $expanded={expanded}
          ref={(el) => {
            taRef.current = el;
          }}
          value={currentValue}
          onChange={(e) => {
            const el = e.target as HTMLTextAreaElement;
            setValue(el.value);
            if (onChange) onChange(e);
            const isMulti = syncAutoSize(el);
            el && (isMulti ? null : null);
          }}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => (composing.current = true)}
          onCompositionEnd={() => (composing.current = false)}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          style={{ resize: "none", overflow: "hidden" }}
        />

        <S.IconButton
          $expanded={expanded}
          onClick={() => {
            if (!disabled) handleSubmit();
          }}
          aria-label="send"
          disabled={disabled}
        >
          <ArrowIcon />
        </S.IconButton>
      </S.InputWrapper>
    </S.Container>
  );
};

export default AITextarea;