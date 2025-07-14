import * as S from "./style";
import { ReactComponent as Map } from "@assets/category/map.svg";
import { ReactComponent as Person } from "@assets/category/person.svg";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
const NoticeCard = () => {
  const categoryInfo = getNoticeCategoryInfo("FUNDS");

  return (
    <S.NoticeContainer>
      <S.CategoryContainer>
        {categoryInfo.icon}
        <span>{categoryInfo.text}</span>
      </S.CategoryContainer>
      <S.TitleText>AI 디지털 전환 혁신기업 해외실증 지원 사원</S.TitleText>
      <p>모집 기간 2025.04.02.~2025.04.06.</p>
      <div style={{ display: "flex" }}>
        <S.Tag>
          <Map style={{ marginRight: "2px" }} />
          대구경북
        </S.Tag>
        <S.Tag>
          <Person />
          설립 1년
        </S.Tag>
      </div>
    </S.NoticeContainer>
  );
};

export default NoticeCard;
