import { useNavigate } from "react-router-dom";
import { ReactComponent as ImageIcon } from "@assets/images/templates/no-image.svg";
import { ReactComponent as DotsIcon } from "@assets/icons/dots.svg";
import * as S from "./style";
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

const BmcCard = ({ id, title, date, imageUrl, type = "bmc", onDelete, onCardClick }: BmcCardProps) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick();
    } else if (type === "bmc") {
      navigate(`/bmc/detail/${id}`);
    } else if (type === "competitor") {
      navigate(`/competitor/analysis?bmcId=${id}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleDotsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);

    try {
      if (type === "bmc") {
        await downloadBmc(id);
      } else if (type === "competitor") {
        await downloadCompetitorAnalysis(id, title);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("다운로드에 실패했습니다.");
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);

    if (!window.confirm(`"${title}"을(를) 삭제하시겠습니까?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      if (type === "bmc") {
        await bmcApi.deleteCanvases(id.toString());
        if (onDelete) {
          onDelete();
        }
        toast.success("BMC가 삭제되었습니다.");
      } else if (type === "competitor") {
        toast.error("경쟁사 분석 삭제 기능은 준비 중입니다.");
        return;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <S.BmcImageContainer>
      <S.ImageWrapper onClick={handleClick}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <S.IconPlaceholder>
            <ImageIcon width={60} height={60}/>
          </S.IconPlaceholder>
        )}
        <S.TextContainer>
          <S.TextInfo>
            <S.Title>{title}</S.Title>
            <S.Date>{date}</S.Date>
          </S.TextInfo>
          <S.MenuButton onClick={handleDotsClick} $isDisabled={isDeleting}>
            <DotsIcon width={20} height={20} />
          </S.MenuButton>
          {showDropdown && (
            <S.DropdownMenu ref={dropdownRef}>
              <S.DropdownItem onClick={handleDownload}>
                다운로드
              </S.DropdownItem>
              {type === "bmc" && (
                <S.DropdownItem onClick={handleDelete} $isDelete>
                  삭제
                </S.DropdownItem>
              )}
            </S.DropdownMenu>
          )}
        </S.TextContainer>
      </S.ImageWrapper>
    </S.BmcImageContainer>
  );
};

export default BmcCard;
