"use client";
import { ReactComponent as FoldArrowIcon } from "@assets/icons/fold-arrow.svg";
import { useRouter } from "next/navigation";

interface FoldArrowProps {
  title: string;
  backPath?: string;
}

const FoldArrow = ({ title, backPath = "/" }: FoldArrowProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center self-start mb-6">
      <FoldArrowIcon
        onClick={() => router.push(backPath)}
        className="w-[15px] cursor-pointer"
      />
      <span className="font-pt-h2-semibold ml-[10px]">{title}</span>
    </div>
  );
};

export default FoldArrow;
