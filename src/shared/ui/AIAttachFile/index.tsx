import * as S from "./style";
import { ReactComponent as AIBmcIcon } from "@assets/icons/ai-bmc.svg";

export interface AIAttachFileProps {
  title: string;
  date: string;
  link: string;
}

const AIAttachFile = ({ title, date, link }: AIAttachFileProps) => {
  return (
    <S.Container as="a" href={link} target="_blank" rel="noopener noreferrer">
      <S.IconWrapper>
        <AIBmcIcon />
        <div>
          <h1>{title}</h1>
          <p>{date}</p>
        </div>
      </S.IconWrapper>
    </S.Container>
  );
};

export default AIAttachFile;
