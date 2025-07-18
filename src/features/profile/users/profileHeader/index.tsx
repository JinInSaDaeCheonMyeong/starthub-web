import * as S from "./style";
import { StartHubColors } from "@/shared/design";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isMyPage = location.pathname === "/my-profile";
  const isBusiness = location.pathname === "/my-business";

  const handleMyPageClick = () => {
    navigate("/my-profile");
  };

  const handleBusinessClick = () => {
    navigate("/my-business");
  };

  return (
    <S.ProfileHeader>
      <S.MyPageButton 
        onClick={handleMyPageClick}
        style={{
          borderBottom: isMyPage ? `2px solid ${StartHubColors.Primary}` : "none",
          paddingBottom: "8px"
        }}
      >
        마이페이지
      </S.MyPageButton>
      <S.BusinessButton 
        onClick={handleBusinessClick}
        style={{
          borderBottom: isBusiness ? `2px solid ${StartHubColors.Primary}` : "none",
          paddingBottom: "8px"
        }}
      >
        비즈니스페이지
      </S.BusinessButton>
    </S.ProfileHeader>
  );
};

export default ProfileHeader;