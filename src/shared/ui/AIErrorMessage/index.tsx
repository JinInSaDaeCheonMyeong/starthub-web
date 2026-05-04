interface ChatErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const AIErrorMessage = ({
  message = "오류가 발생했습니다. 다시 시도해 주세요.",
  onRetry,
}: ChatErrorMessageProps) => {
  return (
    <div className="flex items-center justify-between gap-[10px] px-3 py-[10px] rounded-[10px] border border-hub-error bg-[rgba(235,87,87,0.06)]">
      <p className="font-pt-caption1-regular text-hub-error m-0 flex-1">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 flex items-center gap-1 px-[10px] py-[5px] rounded-md border border-hub-error font-pt-caption2-regular text-hub-error cursor-pointer whitespace-nowrap bg-transparent outline-none transition-colors duration-150 hover:bg-[rgba(235,87,87,0.1)] active:bg-[rgba(235,87,87,0.18)]"
        >
          ↺ 다시 시도
        </button>
      )}
    </div>
  );
};

export default AIErrorMessage;
