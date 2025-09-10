import * as S from "./style";
import { ReactComponent as Map } from "@assets/category/map.svg";
import { ReactComponent as Person } from "@assets/category/person.svg";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import { NoticeType } from "@/entities/notice/model/notice.type";

interface NoticeCardProps {
  notice: NoticeType;
}

function NoticeCard({ notice }: NoticeCardProps) {

  const categoryInfo = getNoticeCategoryInfo(notice.supportField);

  const getApplyTargetDisplay = () => {
    if (!notice.targetAge) return "";

    const targets = notice.targetAge
      .split(",")
      .map((target) => target.trim())
      .filter((target) => target);
    if (targets.length === 0) return "";
    if (targets.length === 1) return targets[0];
    return `${targets[0]} 등`;
  };

  const applyTargetDisplay = getApplyTargetDisplay();

  const handleClick = () => {
    if (notice.url) {
      window.open(notice.url, "_blank");
    }
  };

  return (
    <S.NoticeContainer onClick={handleClick} style={{ cursor: "pointer" }}>
      <S.CategoryContainer>
        {categoryInfo.icon}
        <span>{categoryInfo.text}</span>
      </S.CategoryContainer>
      <S.TitleText>{notice!.title}</S.TitleText>
      <p>모집 기간 {notice!.receptionPeriod}</p>
      <div style={{ display: "flex", gap: "4px" }}>
        <S.Tag>
          <Map style={{ marginRight: "2px" }} />
          {notice!.region}
        </S.Tag>
        {applyTargetDisplay && (
          <S.Tag>
            <Person />
            {applyTargetDisplay}
          </S.Tag>
        )}
      </div>
    </S.NoticeContainer>
  );
}

export default NoticeCard;