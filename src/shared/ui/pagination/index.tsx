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
  siblingCount?: number;
}

const DOTS = "...";

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  };

  const safeTotalPages = Math.min(totalPages, 500);
  const pagination = paginationRange();

  return (
    <S.pagination>
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
        if (page === DOTS) {
          return <p key={idx}>···</p>;
        }

        return (
          <S.PageNumber
            key={idx}
            isActive={Number(page) === currentPage}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </S.PageNumber>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === safeTotalPages}
        style={{ border: "none", background: "transparent", cursor: "pointer" }}
        onMouseEnter={() => setIsRightHovered(true)}
        onMouseLeave={() => setIsRightHovered(false)}
      >
        {isRightHovered ? <RightHoverArrow /> : <RightArrow />}
      </button>
    </S.pagination>
  );
};

export default Pagination;
