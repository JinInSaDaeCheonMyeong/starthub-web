import SectionBlock from "@/shared/ui/SectionBlock";
import * as S from "./style";
import NoticeCard from "@/shared/ui/NoticeCard";

const NoticeContent = () => {
  return (
    <S.NoticeContentContainer>
       <SectionBlock title="자금 분야 최신 공고 확인하기">
        <S.NoticeContainer>
          {Array.from({ length: 4 }).map((_, i) => (
            <NoticeCard key={i} />
          ))}
        </S.NoticeContainer>
      </SectionBlock>

      <SectionBlock title="자금 최신 분야 공고 확인하기">
        <S.NoticeContainer>
        {Array.from({ length: 4 }).map((_, i) => (
            <NoticeCard key={i} />
          ))}    
        </S.NoticeContainer>  
      </SectionBlock>

      <SectionBlock title="자금 최신 분야 공고 확인하기">
      <S.NoticeContainer>
      {Array.from({ length: 4 }).map((_, i) => (
            <NoticeCard key={i} />
          ))}
      </S.NoticeContainer>
      </SectionBlock>

      <SectionBlock title="자금 최신 분야 공고 확인하기">
        <S.NoticeContainer>
        {Array.from({ length: 4 }).map((_, i) => (
            <NoticeCard key={i} />
          ))}
        </S.NoticeContainer>
      </SectionBlock>
    </S.NoticeContentContainer>
  );
};

export default NoticeContent;
