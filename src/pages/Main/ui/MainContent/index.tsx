import * as S from "./style";
import BoxMenu from "@/features/boxMenu/ui";
import HiringCard from "@/shared/ui/HiringCard";
import NoticeCard from "@/shared/ui/NoticeCard";
import { useGetCompanyPost } from "@/features/post/getPostAll/model/useGetCompanyPost";
import SectionBlock from "@/shared/ui/SectionBlock";

const MainContent = () => {
  const { data, isLoading, isError } = useGetCompanyPost();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했어요</div>;

  return (
    <S.ContentContainer>
      <SectionBlock title="요즘 뜨는 IT 분야 스타트업 채용">
        <S.BoxMenuContainer>
          {data?.slice(0, 4).map((hiring) => (
            <HiringCard
              key={hiring.id}
              companyName={hiring.companyName}
              companyDescription={hiring.companyDescription}
              companyCategory={hiring.companyCategory}
            />
          ))}
        </S.BoxMenuContainer>
      </SectionBlock>

      <SectionBlock title="자금 분야 최신 공고 확인하기">
        <S.NoticeContainer>
          {Array.from({ length: 4 }).map((_, i) => (
            <NoticeCard key={i} />
          ))}
        </S.NoticeContainer>
      </SectionBlock>

      <S.BoxMenuContainer>
        <BoxMenu />
      </S.BoxMenuContainer>
    </S.ContentContainer>
  );
};

export default MainContent;
