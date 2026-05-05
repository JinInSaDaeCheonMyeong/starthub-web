"use client";
import { useRouter } from "next/navigation";
import BmcTemplate from "@assets/images/bmc에시.png";

interface BmcCardProps {
  bmcId: number;
  title: string;
  date: string;
  isMobile?: boolean;
}

const BmcCard = ({ bmcId, title, date, isMobile = false }: BmcCardProps) => {
  const router = useRouter();

  if (isMobile) {
    // 모바일 리스트 형태
    return (
      <div
        onClick={() => router.push(`/competitor/create?bmcId=${String(bmcId)}`)}
        className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg cursor-pointer hover:bg-hub-gray-4 transition-colors"
      >
        <div className="flex-1">
          <h3 className="font-pt-body2-medium text-hub-black-1 mb-1">
            {title}
          </h3>
          <p className="font-pt-caption2-regular text-hub-gray-2">
            {date}
          </p>
        </div>
        <button className="ml-4 p-2 text-hub-gray-2 hover:text-hub-black-1">
          ⋯
        </button>
      </div>
    );
  }

  // 데스크탑 카드 형태
  return (
    <div
      onClick={() => router.push(`/competitor/create?bmcId=${String(bmcId)}`)}
      className="inline-block rounded-[10px] bg-hub-white-1 cursor-pointer w-full max-w-[242px] h-full transition-all duration-300 hover:opacity-50"
    >
      <div className="h-full bg-hub-white-1 w-full">
        <img
          src={BmcTemplate.src}
          alt={title}
          className="w-full h-auto rounded-[10px] border border-hub-gray-3"
        />
        <div className="p-3">
          <p className="font-pt-caption1-regular text-hub-black-1 m-0 mb-1">{title}</p>
          <p className="font-pt-caption2-regular text-hub-gray-1 m-0">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default BmcCard;
