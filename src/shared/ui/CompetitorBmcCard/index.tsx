"use client";
import { useRouter } from "next/navigation";
import BmcTemplate from "@assets/images/bmc에시.png";
import * as S from "./style";

interface BmcCardProps {
  bmcId: number;
  title: string;
  date: string;
}

const BmcCard = ({ bmcId, title, date }: BmcCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    // BMC 선택 시 경쟁사 분석 생성 페이지로 이동 (POST 요청)
    router.push(`/competitor/create?bmcId=${String(bmcId)}`);
  };

  return (
    <S.BmcImageContainer onClick={handleClick}>
      <S.ImageWrapper>
        <img src={BmcTemplate} alt={title} />
        <S.Title>{title}</S.Title>
        <S.Date>{date}</S.Date>
      </S.ImageWrapper>
    </S.BmcImageContainer>
  );
};

export default BmcCard;
