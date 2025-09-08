import FoldArrow from "@/shared/ui/FoldArrow";
import Layout from "@/shared/ui/Layout";
import { useParams } from "react-router-dom";

const NoticeListUpPage = () => {
  const { type } = useParams();

  return (
    <Layout>
      <FoldArrow
        title={
          type === "software" ? "IT/소프트웨어 분야 최신 공고" : "AI 추천 공고"
        }
      />
      {/* notice 공고 띄우기 */}
    </Layout>
  );
};

export default NoticeListUpPage;
