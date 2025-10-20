import { useNavigate } from "react-router-dom";
import { ReactComponent as ImageIcon } from "@assets/images/templates/no-image.svg";
import * as S from "./style";

interface BmcCardProps {
  id: number;
  title: string;
  date: string;
  imageUrl?: string;
}

const BmcCard = ({ id, title, date, imageUrl }: BmcCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bmc/detail/${id}`);
  };

  return (
    <S.BmcImageContainer onClick={handleClick}>
      <S.ImageWrapper>
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <S.IconPlaceholder>
            <ImageIcon width={60} height={60}/>
          </S.IconPlaceholder>
        )}
        <S.TextContainer>
          <S.Title>{title}</S.Title>
          <S.Date>{date}</S.Date>
        </S.TextContainer>
      </S.ImageWrapper>
    </S.BmcImageContainer>
  );
};

export default BmcCard;
