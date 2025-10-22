import * as S from "./style";
import { ReactComponent as LogoIcon } from "@/assets/logo/logoIcon.svg";
import useSessionStore from "@/entities/bmc/model/useSessionStore";
import { useNavigate } from "react-router-dom";

const BmcHeader = () => {
  const navigate = useNavigate();
  const { title, createdAt } = useSessionStore();

  return (
    <S.HeaderContainer>
      <LogoIcon width={104} height={18} onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
      <S.BmcTitle>{title}</S.BmcTitle>
      <S.BmcDate>
        {createdAt && new Date(createdAt).toLocaleDateString('ko-KR')}
      </S.BmcDate>
    </S.HeaderContainer>
  );
};

export default BmcHeader;
