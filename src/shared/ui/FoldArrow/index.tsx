import * as S from "./style";
import { ReactComponent as FoldArrowIcon } from "@assets/icons/fold-arrow.svg";
import { useNavigate } from "react-router-dom";



interface FoldArrowProps {
  title: string;
  backPath?: string;
}

const FoldArrow= ({ title, backPath = "/" }: FoldArrowProps) => {
  const navigate = useNavigate();

  return (
    <S.FoldArrowContainer>
      <FoldArrowIcon onClick={() => navigate(backPath)} />
      <span>{title}</span>
    </S.FoldArrowContainer>
  );
};

export default FoldArrow;


