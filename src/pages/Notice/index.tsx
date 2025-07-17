import Layout from "@/shared/ui/Layout";
import SearchNotice from "@/features/notice/ui/searchNotice";
import { NoticeData } from "@/entities/notice/model/notice.type";
import { useState, useCallback } from "react";
import NoticeCard from "@/shared/ui/NoticeCard";
import * as S from "./style";
import Pagination from "@/shared/ui/pagination";

const NoticePage = () => {
  const [filteredNotices, setFilteredNotices] = useState<NoticeData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleFilteredChange = useCallback(
    (notices: NoticeData[], total: number) => {
      setFilteredNotices(notices);
      setTotalCount(total);
    },
    []
  );
  

  return (
    <Layout>
      <SearchNotice
        onFilteredNoticesChange={handleFilteredChange}
        currentPage={currentPage}
      />
      <S.NoticeContentContainer>
        {filteredNotices.length === 0 ? (
          <div>
            <p>검색 조건에 맞는 공고가 없습니다.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredNotices.map((notice, index) => (
              <NoticeCard key={`notice-${index}`} notice={notice} />
            ))}
          </div>
        )}
      </S.NoticeContentContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / 16)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </Layout>
  );
};

export default NoticePage;
