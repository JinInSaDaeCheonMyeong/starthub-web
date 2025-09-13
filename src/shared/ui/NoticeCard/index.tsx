import * as S from "./style";
import { ReactComponent as Map } from "@assets/category/map.svg";
import { ReactComponent as Person } from "@assets/category/person.svg";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import { NoticeType } from "@/entities/notice/model/notice.type";

interface NoticeCardProps {
  notice: NoticeType;
}

const NoticeCard = ({ notice }: NoticeCardProps) => {

  const categoryInfo = getNoticeCategoryInfo(notice.supportField);

const getApplyTargetDisplay = () => {
  if (!notice.targetAge) return "";

  const targets = notice.targetAge
    .split(",")
    .map((target) => target.trim())
    .filter((target) => target);
  if (targets.length === 0) return "";

  const firstTarget = targets[0];

  const getAgeGroup = (target: string) => {
    const match = target.match(/만\s*(\d+)\s*세/);
    if (!match) return target; 
    const age = parseInt(match[1], 10);

    if (target.includes("~")) {
      if (age >= 20 && age < 30) return "20대";
      if (age >= 30 && age < 40) return "30대";
      if (age >= 40 && age < 50) return "40대";
      if (age >= 50 && age < 60) return "50대";
      return `${age}대`;
    } else {
      if (target.includes("이상")) {
        return `${age}세 이상`;
      }
      if (target.includes("이하")) {
        return `${age}세 이하`;
      }
      return `${age}세`;
    }
  };

  const display = getAgeGroup(firstTarget);

  return targets.length > 1 ? `${display} 등` : display;
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