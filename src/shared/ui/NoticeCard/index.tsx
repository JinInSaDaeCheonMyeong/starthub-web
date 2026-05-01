'use client'

import * as S from "./style";
import { ReactComponent as Map } from "@assets/category/map.svg";
import { ReactComponent as Person } from "@assets/category/person.svg";
import { ReactComponent as KStartupIcon } from "@assets/category/k.svg";
import { ReactComponent as BuildingIcon } from "@assets/category/building.svg";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import { NoticeType } from "@/entities/notice/model/notice.type";
import { useRouter } from "next/navigation";

interface NoticeCardProps {
  notice: NoticeType;
}

const NoticeCard = ({ notice }: NoticeCardProps) => {
  const categoryInfo = getNoticeCategoryInfo(notice.supportField);
  const router = useRouter();

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

  const getSimplifiedRegion = (region: string) => {
    if (!region) return "";

    const provinceMap: { [key: string]: string } = {
      경기도: "경기",
      강원도: "강원",
      충청북도: "충북",
      충청남도: "충남",
      전라북도: "전북",
      전라남도: "전남",
      경상북도: "경북",
      경상남도: "경남",
      제주특별자치도: "제주",
      세종특별자치시: "세종",
    };

    if (provinceMap[region]) {
      return provinceMap[region];
    }

    return region.replace("특별시", "").replace("광역시", "").trim();
  };

  return (
    <S.NoticeContainer
      onClick={() => {
        router.push(`/notice/${String(notice.id)}`);
      }}
      style={{ cursor: "pointer" }}
    >
      <S.CategoryContainer>
        {categoryInfo.icon}
        <span>{categoryInfo.text}</span>
      </S.CategoryContainer>
      <S.TitleText>{notice!.title}</S.TitleText>
      <p>모집 기간 {notice!.receptionPeriod}</p>
      <div style={{ display: "flex", gap: "4px" }}>
        <S.Tag>
          <Map style={{ marginRight: "2px" }} />
          {getSimplifiedRegion(notice!.region)}
        </S.Tag>
        {applyTargetDisplay && (
          <S.Tag>
            <Person />
            {applyTargetDisplay}
          </S.Tag>
        )}
        {notice.source === "BIZINFO" && (
          <S.Tag>
            <BuildingIcon />
            기업마당
          </S.Tag>
        )}
        {notice.source === "K_STARTUP" && (
          <S.Tag>
            <KStartupIcon />
            K-Startup
          </S.Tag>
        )}
      </div>
    </S.NoticeContainer>
  );
};

export default NoticeCard;
