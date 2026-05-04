"use client";
import { useRouter } from "next/navigation";
import { ReactComponent as ImageIcon } from "@assets/images/templates/no-image.svg";
import { ReactComponent as DotsIcon } from "@assets/icons/dots.svg";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { downloadBmc, downloadCompetitorAnalysis } from "./downloadUtils";

interface BmcCardProps {
  id: number;
  title: string;
  date: string;
  imageUrl?: string;
  type?: "bmc" | "competitor";
  onDelete?: () => void;
  onCardClick?: () => void;
}

const BmcCard = ({
  id,
  title,
  date,
  imageUrl,
  type = "bmc",
  onDelete,
  onCardClick,
}: BmcCardProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick();
    } else if (type === "bmc") {
      router.push(`/bmc/detail/${String(id)}`);
    } else if (type === "competitor") {
      router.push(`/competitor/analysis?bmcId=${String(id)}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown((v) => !v);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    try {
      if (type === "bmc") await downloadBmc(id);
      else if (type === "competitor")
        await downloadCompetitorAnalysis(id, title);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch {
      toast.error("다운로드에 실패했습니다.");
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    if (!window.confirm(`"${title}"을(를) 삭제하시겠습니까?`)) return;

    setIsDeleting(true);
    try {
      if (type === "bmc") {
        await bmcApi.deleteCanvases(id.toString());
        onDelete?.();
        toast.success("BMC가 삭제되었습니다.");
      } else {
        toast.error("경쟁사 분석 삭제 기능은 준비 중입니다.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch {
      toast.error("삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="inline-block rounded-[10px] bg-hub-white-1 w-[242px] h-full transition-all duration-300 relative">
      {/* 이미지 + 텍스트 래퍼 */}
      <div
        onClick={handleClick}
        className="h-full bg-hub-white-1 w-full flex flex-col cursor-pointer"
      >
        {/* 이미지 */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-[170px] rounded-[10px] border border-hub-gray-3"
          />
        ) : (
          <div className="rounded-[10px] w-[242px] h-[170px] flex items-center justify-center border border-hub-gray-3">
            <ImageIcon width={60} height={60} />
          </div>
        )}

        {/* 텍스트 영역 */}
        <div className="flex pt-1 flex-row items-start justify-between bg-hub-white-1 relative">
          <div className="flex flex-col gap-[2px] flex-1">
            <p className="font-pt-caption1-regular text-hub-black-1">{title}</p>
            <p className="font-pt-caption2-regular text-hub-gray-1">{date}</p>
          </div>

          {/* 점 메뉴 버튼 */}
          <button
            onClick={handleDotsClick}
            className={[
              "bg-transparent border-none p-1 flex items-center justify-center -mt-[2px] transition-opacity duration-200 [&_svg]:fill-hub-gray-2",
              isDeleting
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:opacity-70",
            ].join(" ")}
          >
            <DotsIcon width={20} height={20} />
          </button>

          {/* 드롭다운 */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-[30px] right-0 bg-hub-white-1 border border-hub-gray-3 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-[100] overflow-hidden min-w-[120px]"
            >
              <button
                onClick={handleDownload}
                className="w-full px-4 py-[10px] bg-transparent border-none text-left cursor-pointer font-pt-caption1-regular text-hub-black-1 hover:bg-hub-gray-4 border-b border-hub-gray-4 transition-colors duration-200"
              >
                다운로드
              </button>
              {type === "bmc" && (
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-[10px] bg-transparent border-none text-left cursor-pointer font-pt-caption1-regular text-hub-error hover:bg-hub-gray-4 transition-colors duration-200"
                >
                  삭제
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BmcCard;
