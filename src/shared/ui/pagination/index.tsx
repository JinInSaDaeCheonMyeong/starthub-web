import { useState } from "react";
import { ReactComponent as LeftArrow } from "@assets/icons/page-arrow-left.svg";
import { ReactComponent as RightArrow } from "@assets/icons/page-arrow-right.svg";
import { ReactComponent as LeftHoverArrow } from "@assets/icons/page-arrow-hover.svg";
import { ReactComponent as RightHoverArrow } from "@assets/icons/page-arrow-hover-right.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const paginationRange = () => {
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) return range(1, totalPages);

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage === totalPages)
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);

    return range(startPage, endPage);
  };

  return (
    <div className="flex items-center mt-[100px] mb-[30px] gap-5 [&_svg]:w-6 [&_svg]:h-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        onMouseEnter={() => setIsLeftHovered(true)}
        onMouseLeave={() => setIsLeftHovered(false)}
      >
        {isLeftHovered ? <LeftHoverArrow /> : <LeftArrow />}
      </button>

      {paginationRange().map((page, idx) => {
        const isActive = page === currentPage;
        return (
          <p
            key={idx}
            onClick={() => onPageChange(page)}
            className={[
              "cursor-pointer pb-1 font-pt-caption1-regular transition-all duration-200",
              isActive
                ? "text-hub-black-1 border-b-2 border-hub-black-1"
                : "text-hub-gray-2 border-b-2 border-transparent",
            ].join(" ")}
          >
            {page}
          </p>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
        onMouseEnter={() => setIsRightHovered(true)}
        onMouseLeave={() => setIsRightHovered(false)}
      >
        {isRightHovered ? <RightHoverArrow /> : <RightArrow />}
      </button>
    </div>
  );
};

export default Pagination;
