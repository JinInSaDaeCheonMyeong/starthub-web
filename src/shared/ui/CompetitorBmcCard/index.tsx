"use client";
import { useRouter } from "next/navigation";
import BmcTemplate from "@assets/images/bmc에시.png";

interface BmcCardProps {
  bmcId: number;
  title: string;
  date: string;
}

const BmcCard = ({ bmcId, title, date }: BmcCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/competitor/create?bmcId=${String(bmcId)}`)}
      className="inline-block rounded-[10px] bg-hub-white-1 cursor-pointer w-[242px] h-full transition-all duration-300 hover:opacity-50"
    >
      <div className="h-full bg-hub-white-1 w-full">
        <img src={BmcTemplate.src} alt={title} />
        <p className="font-pt-caption1-regular text-hub-black-1 m-0">{title}</p>
        <p className="font-pt-caption2-regular text-hub-gray-1 m-0">{date}</p>
      </div>
    </div>
  );
};

export default BmcCard;
