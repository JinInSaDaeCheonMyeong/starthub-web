import { useState } from "react";
import { ReactComponent as LeftArrow } from "@assets/icons/page-arrow-left.svg";
import { ReactComponent as RightArrow } from "@assets/icons/page-arrow-right.svg";
import { ReactComponent as LeftHoverArrow } from "@assets/icons/page-arrow-hover.svg";
import { ReactComponent as RightHoverArrow } from "@assets/icons/page-arrow-hover-right.svg";
import * as S from "./style";

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

    if (totalPages <= maxVisiblePages) {
      return range(1, totalPages);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    return range(startPage, endPage);
  };

  const pagination = paginationRange();


  return (
    <S.Pagination>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
        onMouseEnter={() => setIsLeftHovered(true)}
        onMouseLeave={() => setIsLeftHovered(false)}
      >
        {isLeftHovered ? <LeftHoverArrow /> : <LeftArrow />}
      </button>

      {pagination?.map((page, idx) => {
        const isActive = Number(page) === currentPage;

        return (
          <S.PageNumber
            key={idx}
            $isActive={isActive}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </S.PageNumber>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
        onMouseEnter={() => setIsRightHovered(true)}
        onMouseLeave={() => setIsRightHovered(false)}
      >
        {isRightHovered ? <RightHoverArrow /> : <RightArrow />}
      </button>
    </S.Pagination>
  );
};

export default Pagination;
