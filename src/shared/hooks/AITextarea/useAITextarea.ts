import { useCallback, useEffect, useRef, useState } from "react";

export interface UseAITextareaParams {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (text: string, files?: File[]) => void;
  maxLines?: number;
}

export default function useAITextarea({
  value,
  onChange,
  onSubmit,
  maxLines = 4,
}: UseAITextareaParams) {
  const [internalValue, setInternalValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const composing = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const currentValue = value !== undefined ? value : internalValue;

  const setValue = useCallback(
    (next: string) => {
      if (value === undefined) setInternalValue(next);
      if (onChange) onChange(next);
    },
    [onChange, value],
  );

  const syncAutoSize = useCallback(
    (el: HTMLTextAreaElement | null): boolean => {
      if (!el) return false;
      el.style.height = "auto";
      const style = window.getComputedStyle(el);
      const padding =
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      const lineHeight = parseFloat(style.lineHeight) || 20;
      const singleLineHeight = lineHeight + padding;
      const maxHeight = lineHeight * maxLines + padding;
      const newHeight = Math.min(el.scrollHeight, maxHeight);
      el.style.height = `${newHeight}px`;
      if (el.scrollHeight > maxHeight) {
        el.style.overflowY = "auto";
        el.scrollTop = el.scrollHeight;
      } else {
        el.style.overflowY = "hidden";
      }
      const isMultiline = el.scrollHeight > singleLineHeight + 1;
      return isMultiline;
    },
    [maxLines],
  );

  useEffect(() => {
    const el = taRef.current;
    if (el) {
      const isMulti = syncAutoSize(el);
      setExpanded(isMulti);
    }
  }, [currentValue, syncAutoSize]);

  const handleSubmit = useCallback(() => {
    const text = (currentValue || "").trim();
    if (!text && files.length === 0) return;
    if (onSubmit) onSubmit(text, files.length ? files : undefined);
    if (value === undefined) {
      setInternalValue("");
      if (taRef.current) taRef.current.style.height = "auto";
    }
    setFiles([]);
    setExpanded(false);
  }, [currentValue, files, onSubmit, value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.nativeEvent as any).isComposing) return;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
      if (e.key === "Enter" && e.shiftKey) {
        setTimeout(() => {
          const el = taRef.current;
          if (el) {
            const isMulti = syncAutoSize(el);
            setExpanded(isMulti);
          }
        }, 0);
      }
    },
    [handleSubmit, syncAutoSize],
  );

  const openFilePicker = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files;
      if (!list) return;
      const arr = Array.from(list);
      setFiles((prev) => [...prev, ...arr]);
      e.currentTarget.value = "";
    },
    [],
  );

  const removeFile = useCallback((idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  return {
    taRef,
    composing,
    expanded,
    setExpanded,
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
  };
}
