import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";
import SideBar from "@/features/profile/users/sideBar";
import { ProfileData } from "@/shared/types/ProfileTypes";
import { profileApi } from "@/shared/api/profileApi";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import NotMyPage from "./ui/NotMyPage";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { isLoggedIn } = useAuthStore()
  
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      if(isLoggedIn){
        const data = await profileApi.getUserProfile();
        setProfileData(data);
      }
    } catch {
      toast.error("프로필 로딩 실패");
    }
  };

  const handleEditClick = () => {
    navigate("/my-profile-edit");
  };

  const formatGender = (gender?: string | null) =>
    gender === "MALE" ? "남자" : gender === "FEMALE" ? "여자" : "-";

  const formatCurrency = (amount?: number | null) =>
    typeof amount === "number" ? `${amount.toLocaleString()}원` : "-";

  const formatEmployees = (count?: number | null) =>
    typeof count === "number" ? `${count}명` : "-";

  const safeValue = (value?: string | null) => value || "-";



  return (
    <S.Wrapper>
      <SideBar />

      {isLoggedIn ? (
        <S.MainContent>
          <>
            <S.HeaderSection>
              <S.Motto>“어제의 꿈은 오늘의 희망이며 내일의 현실이다.”</S.Motto>
              <S.Greeting>
                오늘도 잘 부탁드립니다,{" "}
                <S.Username>{profileData?.username}</S.Username>님!
              </S.Greeting>
            </S.HeaderSection>

            <S.InfoTable>
              <tbody>
                {profileData &&
                  [
                    { label: "성별", value: formatGender(profileData.gender) },
                    { label: "생년월일", value: safeValue(profileData.birth) },
                    {
                      label: "회사명",
                      value: safeValue(profileData.companyName),
                    },
                    {
                      label: "기업 설명",
                      value: safeValue(profileData.companyDescription),
                    },
                    {
                      label: "창업 위치",
                      value: safeValue(profileData.startupLocation),
                    },
                    {
                      label: "연매출액",
                      value: formatCurrency(profileData.annualRevenue),
                    },
                    {
                      label: "기업 인원",
                      value: formatEmployees(profileData.numberOfEmployees),
                    },
                    {
                      label: "기업 사이트",
                      value: safeValue(profileData.companyWebsite),
                    },
                  ].map(({ label, value }) => (
                    <S.InfoRow key={label}>
                      <S.InfoLabel>{label}</S.InfoLabel>
                      <S.InfoValue>{value}</S.InfoValue>
                    </S.InfoRow>
                  ))}
              </tbody>
            </S.InfoTable>

            <StartHubButton
              text="수정"
              width={77}
              height={36}
              typography={StartHubFont.Pretendard.Caption2.Medium}
              backgroundColor={StartHubColors.Primary}
              textTheme={StartHubColors.White1}
              customStyle={{
                borderRadius: "6px",
                float: "right",
                marginBottom: "100px",
              }}
              onClick={handleEditClick}
            />
          </>
        </S.MainContent>
      ) : (
          <NotMyPage />
      )}
    </S.Wrapper>
  );
};

export default MyPage;
