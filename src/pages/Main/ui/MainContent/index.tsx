import * as S from "./style";
import BoxMenu from "@/features/boxMenu/ui";
import HiringCard from "@/shared/ui/HiringCard";
import NoticeCard from "@/shared/ui/NoticeCard";
import { useGetCompanyPost } from "@/features/post/getPostAll/model/useGetCompanyPost";
import SectionBlock from "@/shared/ui/SectionBlock";
import { useEffect, useState } from "react";
import axios from "axios";
import { NoticeData } from "@/entities/notice/model/notice.type";

const MainContent = () => {
  const { data: companyPosts, isLoading, isError } = useGetCompanyPost();
  const [noticeData, setNoticeData] = useState<NoticeData[]>([]);

  const fetchFinanceNotices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NOTICE_API_URL}/v1/getAnnouncementInformation`,
        {
          params: {
            page: 1,
            perPage: 4,
            "cond[supt_biz_clsfc::LIKE]": "자금",
            sort: "rdt desc",
            returnType: "json",
          },
        }
      );
      setNoticeData(response.data.data ?? []);
    } catch (error) {
      console.error("자금 분야 공고 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchFinanceNotices();
  }, []);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했어요</div>;

  return (
    <S.ContentContainer>
      <SectionBlock title="요즘 뜨는 IT 분야 스타트업 채용">
        <S.BoxMenuContainer>
          {companyPosts?.slice(0, 4).map((hiring) => (
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
          {noticeData.length > 0 ? (
            noticeData.map((notice, i) => (
              <NoticeCard key={i} notice={notice} />
            ))
          ) : (
            <div>자금 분야 공고가 없습니다.</div>
          )}
        </S.NoticeContainer>
      </SectionBlock>

      <S.BoxMenuContainer>
        <BoxMenu />
      </S.BoxMenuContainer>
    </S.ContentContainer>
  );
};

export default MainContent;
