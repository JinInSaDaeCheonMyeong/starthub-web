import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";
import SideBar from "@/features/profile/users/sideBar";
import { useProfile } from "@/shared/hooks/Profile";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import NotMyPage from "./ui/NotMyPage";
import {
  formatGender,
  formatCurrency,
  formatEmployees,
  safeValue,
} from "../utils/profileDisplayHelpers";

const ProfileForm: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { data: profileData, isLoading, isError } = useProfile();

  // 에러 처리
  useEffect(() => {
    if (isError && isLoggedIn) {
      toast.error("프로필 로딩 실패");
    }
  }, [isError, isLoggedIn]);

  const handleEditClick = () => {
    navigate("/my-profile-edit");
  };

  // 프로필 테이블 데이터 메모이제이션
  const profileTableData = useMemo(() => {
    if (!profileData) return [];

    return [
      { label: "성별", value: formatGender(profileData.gender) },
      { label: "생년월일", value: safeValue(profileData.birth) },
      { label: "회사명", value: safeValue(profileData.companyName) },
      { label: "기업 설명", value: safeValue(profileData.companyDescription) },
      { label: "창업 위치", value: safeValue(profileData.startupLocation) },
      { label: "연매출액", value: formatCurrency(profileData.annualRevenue) },
      { label: "기업 인원", value: formatEmployees(profileData.numberOfEmployees) },
      { label: "기업 사이트", value: safeValue(profileData.companyWebsite) },
    ];
  }, [profileData]);

  // 로딩 중이면 로딩 UI 표시
  if (isLoading && isLoggedIn) {
    return (
      <S.Wrapper>
        <SideBar />
        <S.MainContent>
          <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '16px' }}>
            로딩 중...
          </div>
        </S.MainContent>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <SideBar />

      {isLoggedIn ? (
        <S.MainContent>
          <S.HeaderSection>
            <S.Motto>"어제의 꿈은 오늘의 희망이며 내일의 현실이다."</S.Motto>
            <S.Greeting>
              오늘도 잘 부탁드립니다,{" "}
              <S.Username>{profileData?.username}</S.Username>님!
            </S.Greeting>
          </S.HeaderSection>

          <S.InfoTable>
            <tbody>
              {profileTableData.map(({ label, value }) => (
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
        </S.MainContent>
      ) : (
        <NotMyPage />
      )}
    </S.Wrapper>
  );
};

export default ProfileForm;
