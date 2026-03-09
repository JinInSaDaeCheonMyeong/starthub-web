import * as S from "./style";

export interface AIMessageProps {
  text: string;
  type?: "small" | "big";
}

const AIMessage = ({ text, type = "big" }: AIMessageProps) => {
  return (
    <S.Container $type={type}>
      <span>{text}</span>
    </S.Container>
  );
};

export default AIMessage;
