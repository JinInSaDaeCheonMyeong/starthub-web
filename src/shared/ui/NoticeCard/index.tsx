"use client";

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
      .map((t) => t.trim())
      .filter(Boolean);
    if (targets.length === 0) return "";

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
      }
      if (target.includes("이상")) return `${age}세 이상`;
      if (target.includes("이하")) return `${age}세 이하`;
      return `${age}세`;
    };

    const display = getAgeGroup(targets[0]);
    return targets.length > 1 ? `${display} 등` : display;
  };

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
    return (
      provinceMap[region] ??
      region.replace("특별시", "").replace("광역시", "").trim()
    );
  };

  const applyTargetDisplay = getApplyTargetDisplay();

  return (
    <div
      onClick={() => router.push(`/notice/${String(notice.id)}`)}
      className="w-[250px] h-[150px] bg-hub-white-1 border-2 border-hub-gray-4 px-5 py-[19px] rounded-[14px] cursor-pointer"
    >
      {/* 카테고리 */}
      <div className="flex items-center mb-[5px] gap-[6px] [&_svg]:w-[18px] [&_svg]:h-[18px]">
        {categoryInfo.icon}
        <span className="font-pt-caption2-regular text-hub-primary">
          {categoryInfo.text}
        </span>
      </div>

      {/* 제목 */}
      <div
        className="font-pt-caption1-semibold text-[14px] text-hub-gray-1 overflow-hidden text-ellipsis"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          minHeight: "calc(1.4em * 2)",
          lineHeight: "1.4em",
        }}
      >
        {notice.title}
      </div>

      {/* 모집 기간 */}
      <p className="font-pt-caption2-regular text-[10px] my-[5px]">
        모집 기간 {notice.receptionPeriod}
      </p>

      {/* 태그 */}
      <div className="flex gap-1">
        <div className="flex items-center justify-center h-5 w-fit bg-hub-gray-4 font-pt-caption2-regular px-[6px] rounded-[4px]">
          <Map className="mr-[2px]" />
          {getSimplifiedRegion(notice.region)}
        </div>

        {applyTargetDisplay && (
          <div className="flex items-center justify-center h-5 w-fit bg-hub-gray-4 font-pt-caption2-regular px-[6px] rounded-[4px]">
            <Person />
            {applyTargetDisplay}
          </div>
        )}

        {notice.source === "BIZINFO" && (
          <div className="flex items-center justify-center h-5 w-fit bg-hub-gray-4 font-pt-caption2-regular px-[6px] rounded-[4px]">
            <BuildingIcon />
            기업마당
          </div>
        )}

        {notice.source === "K_STARTUP" && (
          <div className="flex items-center justify-center h-5 w-fit bg-hub-gray-4 font-pt-caption2-regular px-[6px] rounded-[4px]">
            <KStartupIcon />
            K-Startup
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
