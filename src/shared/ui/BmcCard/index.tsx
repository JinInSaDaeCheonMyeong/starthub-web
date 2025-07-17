import  BmcTemplate from "@assets/images/bmc에시.png";
import * as S from "./style";

interface BmcCardProps {
  title: string;
  date: string;
}

const BmcCard = ({ title, date }: BmcCardProps) => {
  return (
    <S.BmcImageContainer>
      <S.ImageWrapper>
        <img src={BmcTemplate} />
        <S.Title>{title}</S.Title>
        <S.Date>{date}</S.Date>
      </S.ImageWrapper>
    </S.BmcImageContainer>
  );
};

export default BmcCard;
