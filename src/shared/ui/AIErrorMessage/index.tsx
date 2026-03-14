import * as S from "./style";

interface ChatErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const AIErrorMessage = ({
  message = "오류가 발생했습니다. 다시 시도해 주세요.",
  onRetry,
}: ChatErrorMessageProps) => {
  return (
    <S.Wrapper>
      <S.Message>{message}</S.Message>
      {onRetry && <S.RetryButton onClick={onRetry}>↺ 다시 시도</S.RetryButton>}
    </S.Wrapper>
  );
};

export default AIErrorMessage;
