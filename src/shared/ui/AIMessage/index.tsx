import * as S from "./style";

export interface AIMessageProps {
  text: string;
}

const AIMessage = ({ text }: AIMessageProps) => {
  return (
    <S.Container>
      <span>{text}</span>
    </S.Container>
  );
};

export default AIMessage;
