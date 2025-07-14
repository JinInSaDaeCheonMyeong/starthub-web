import Layout from "@/shared/ui/Layout";
import SearchNotice from "@/features/notice/ui/searchNotice";
import NoticeContent from "./ui/NoticeContent";

const NoticePage = () => {
  return (
    <Layout>
      <SearchNotice />
      <NoticeContent />
    </Layout>
  );
};

export default NoticePage;
