import { useNavigate } from "react-router-dom";
import BmcTemplate from "@assets/images/bmc에시.png";
import * as S from "./style";

interface BmcCardProps {
  bmcId: number;
  title: string;
  date: string;
}

const BmcCard = ({ bmcId, title, date }: BmcCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // BMC 선택 시 경쟁사 분석 생성 페이지로 이동 (POST 요청)
    navigate(`/competitor/create?bmcId=${bmcId}`);
  };

  return (
    <S.BmcImageContainer onClick={handleClick}>
      <S.ImageWrapper>
        <img src={BmcTemplate} />
        <S.Title>{title}</S.Title>
        <S.Date>{date}</S.Date>
      </S.ImageWrapper>
    </S.BmcImageContainer>
  );
};

export default BmcCard;
