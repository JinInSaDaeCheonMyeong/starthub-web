import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as S from "./style";
import ProfileSidebar from "../../users/profileSideBar";
import ProfileHeader from "../../users/profileHeader";
import BusinessInfo from "@/features/business/businessInfo";
import BusinessViewMode from "@/features/business/businessViewMode";
import BusinessEditMode from "@/features/business/businessEditMode";
import BusinessActionButtons from "@/features/business/businessActionButton";
import type { BusinessFormData } from "@/entities/user/model/business";
import DefaultCompanyImg from "@/assets/images/defaultProfile.png";
import DefaultProfileImg from "@/assets/images/defaultProfile.png";
import { businessApi } from "@/entities/user/api/business";
import { userApi } from "@/entities/user/api/user";

const INITIAL_BUSINESS_FORM_DATA: BusinessFormData = {
  name: "",
  companyDescription: "",
  category: "",
  businessDescription: "",
  pageUrl: "",
  email: "",
  tel: "",
  address: "",
  employeeCount: 0,
  logoImage: "",
};

const STORAGE_KEYS = {
  BUSINESS_DATA: 'businessData',
  CURRENT_BUSINESS: 'currentBusiness',
  FORM_DATA: 'businessFormData'
};

const BusinessProfile = () => {
  // localStorage에서 초기값 가져오기
  const [isEditing, setIsEditing] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [editFormData, setEditFormData] = useState<BusinessFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FORM_DATA);
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_FORM_DATA;
    } catch {
      return INITIAL_BUSINESS_FORM_DATA;
    }
  });
  const [currentBusiness, setCurrentBusiness] = useState<any>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_BUSINESS);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // localStorage에 데이터 저장하는 함수들
  const saveToStorage = useCallback((key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Storage save failed:', error);
    }
  }, []);

  const getFromStorage = useCallback((key: string) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

  // 개인 프로필 정보 가져오기
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userApi.userProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const {
    data: businessData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["businessProfile"],
    queryFn: async () => {
      const response = await businessApi.checkBusiness();
      console.log("API 응답:", response);
      return response;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    placeholderData: () => getFromStorage(STORAGE_KEYS.BUSINESS_DATA), // localStorage에서 placeholder 데이터 가져오기
  });

  // businessData를 localStorage에 저장
  useEffect(() => {
    if (businessData) {
      saveToStorage(STORAGE_KEYS.BUSINESS_DATA, businessData);
    }
  }, [businessData, saveToStorage]);

  // currentBusiness를 localStorage에 저장
  useEffect(() => {
    if (currentBusiness) {
      saveToStorage(STORAGE_KEYS.CURRENT_BUSINESS, currentBusiness);
    }
  }, [currentBusiness, saveToStorage]);

  // editFormData를 localStorage에 저장
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FORM_DATA, editFormData);
  }, [editFormData, saveToStorage]);

  // 서버 응답 처리 및 현재 기업 설정
  useEffect(() => {
    console.log("businessData 변경:", businessData);
    
    if (businessData?.data && Array.isArray(businessData.data) && businessData.data.length > 0) {
      // 배열에서 가장 최근 기업 선택 (ID가 가장 큰 기업)
      const latestBusiness = businessData.data.reduce((latest, current) => 
        (!latest || current.id > latest.id) ? current : latest
      );
      
      console.log("선택된 기업:", latestBusiness);
      
      // 현재 기업이 변경되었을 때만 상태 업데이트
      if (!currentBusiness || currentBusiness.id !== latestBusiness.id) {
        setCurrentBusiness(latestBusiness);
        
        console.log("서버에서 받은 각 필드값:");
        console.log("companyName:", latestBusiness.companyName);
        console.log("companyDescription:", latestBusiness.companyDescription);
        console.log("businessDescription:", latestBusiness.businessDescription);
        console.log("companyUrl:", latestBusiness.companyUrl);
        console.log("contactEmail:", latestBusiness.contactEmail);
        console.log("contactNumber:", latestBusiness.contactNumber);
        console.log("address:", latestBusiness.address);
        console.log("employeeCount:", latestBusiness.employeeCount);
        
        // 폼 데이터 설정 (모든 필드 매핑)
        const mappedData: BusinessFormData = {
          name: latestBusiness.companyName || "",
          companyDescription: latestBusiness.companyDescription || "",
          category: latestBusiness.companyCategory || "",
          businessDescription: latestBusiness.businessDescription || "",
          pageUrl: latestBusiness.companyUrl || "",
          email: latestBusiness.contactEmail || "",
          tel: latestBusiness.contactNumber || "",
          address: latestBusiness.address || "",
          employeeCount: latestBusiness.employeeCount || 0,
          logoImage: latestBusiness.logoImage || "",
        };
        
        console.log("매핑된 폼 데이터:", mappedData);
        setEditFormData(mappedData);
      }
    } else if (businessData?.data && (!Array.isArray(businessData.data) || businessData.data.length === 0)) {
      // 기업 데이터가 없는 경우에만 초기화
      console.log("기업 데이터 없음");
      if (currentBusiness) {
        setCurrentBusiness(null);
        setEditFormData(INITIAL_BUSINESS_FORM_DATA);
        // localStorage에서도 제거
        localStorage.removeItem(STORAGE_KEYS.CURRENT_BUSINESS);
        localStorage.removeItem(STORAGE_KEYS.FORM_DATA);
      }
    }
  }, [businessData, currentBusiness]);

  // 컴포넌트 마운트 시 localStorage에서 데이터 복원
  useEffect(() => {
    const savedBusiness = getFromStorage(STORAGE_KEYS.CURRENT_BUSINESS);
    const savedFormData = getFromStorage(STORAGE_KEYS.FORM_DATA);
    
    if (savedBusiness && !currentBusiness) {
      setCurrentBusiness(savedBusiness);
    }
    
    if (savedFormData && editFormData === INITIAL_BUSINESS_FORM_DATA) {
      setEditFormData(savedFormData);
    }
  }, []);

  // 기업 프로필 존재 여부 (실시간 계산)
  const hasBusinessProfile = !!currentBusiness?.id;

  console.log("현재 상태:", {
    hasBusinessProfile,
    currentBusiness: currentBusiness?.id,
    isRegistering,
    businessDataExists: !!businessData?.data
  });

  const registerMutation = useMutation({
    mutationFn: businessApi.createBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
      setIsRegistering(false);
      setIsEditing(false);
      refetch();
    },
    onError: (err) => {
      console.error("기업 등록 실패:", err);
      alert("기업 등록에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: BusinessFormData) =>
      businessApi.updateBusiness(currentBusiness?.id?.toString() || "", data),
    onSuccess: async () => {
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["businessProfile"] });
      
      // 강제 새로고침
      await refetch();
      
      setIsEditing(false);
      
      console.log("업데이트 완료 - 새로고침 후 데이터 확인");
    },
    onError: (err) => {
      console.error("기업 정보 업데이트 실패:", err);
      alert("기업 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const profileImage = editFormData.logoImage || DefaultCompanyImg;

  const handleRegister = useCallback(() => {
    setIsRegistering(true);
    setIsEditing(false);
    setEditFormData(INITIAL_BUSINESS_FORM_DATA);
  }, []);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setIsRegistering(false);
    if (currentBusiness) {
      const mappedData: BusinessFormData = {
        name: currentBusiness.companyName || "",
        companyDescription: currentBusiness.companyDescription || "",
        category: currentBusiness.companyCategory || "",
        businessDescription: currentBusiness.businessDescription || "",
        pageUrl: currentBusiness.companyUrl || "",
        email: currentBusiness.contactEmail || "",
        tel: currentBusiness.contactNumber || "",
        address: currentBusiness.address || "",
        employeeCount: currentBusiness.employeeCount || 0,
        logoImage: currentBusiness.logoImage || "",
      };
      setEditFormData(mappedData);
    }
  }, [currentBusiness]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setIsRegistering(false);
    if (currentBusiness) {
      const mappedData: BusinessFormData = {
        name: currentBusiness.companyName || "",
        companyDescription: currentBusiness.companyDescription || "",
        category: currentBusiness.companyCategory || "",
        businessDescription: currentBusiness.businessDescription || "",
        pageUrl: currentBusiness.companyUrl || "",
        email: currentBusiness.contactEmail || "",
        tel: currentBusiness.contactNumber || "",
        address: currentBusiness.address || "",
        employeeCount: currentBusiness.employeeCount || 0,
        logoImage: currentBusiness.logoImage || "",
      };
      setEditFormData(mappedData);
    } else {
      setEditFormData(INITIAL_BUSINESS_FORM_DATA);
    }
  }, [currentBusiness]);

  const handleSave = useCallback(() => {
    // 폼 검증
    if (!editFormData.name.trim()) {
      alert("기업명을 입력해주세요.");
      return;
    }
    
    if (!editFormData.category) {
      alert("카테고리를 선택해주세요.");
      return;
    }

    const mutation = isRegistering ? registerMutation : updateMutation;
    mutation.mutate(editFormData);
  }, [isRegistering, editFormData, registerMutation, updateMutation]);

  const handleInputChange = useCallback(
    (field: keyof BusinessFormData, value: string | number) => {
      setEditFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditFormData((prev) => ({
          ...prev,
          logoImage: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // localStorage 데이터 클리어 함수 (필요시 사용)
  const clearStorageData = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    setCurrentBusiness(null);
    setEditFormData(INITIAL_BUSINESS_FORM_DATA);
  }, []);

  console.log("렌더링 상태:", {
    hasBusinessProfile,
    isRegistering,
    currentBusiness: currentBusiness?.id,
    condition: !hasBusinessProfile && !isRegistering,
    showEmptyState: !hasBusinessProfile && !isRegistering,
    showBusinessInfo: hasBusinessProfile || isRegistering
  });

  if (isLoading && !currentBusiness) { // localStorage에 데이터가 있으면 로딩 중에도 표시
    return (
      <S.ProfileLayout>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <p>로딩 중...</p>
        </div>
      </S.ProfileLayout>
    );
  }

  if (error && !currentBusiness) { // localStorage에 데이터가 있으면 에러 시에도 표시
    console.error("API 에러:", error);
    return (
      <S.ProfileLayout>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <p>데이터를 불러오지 못했습니다.</p>
          <button onClick={() => refetch()} style={{ marginLeft: "10px" }}>
            다시 시도
          </button>
          <button onClick={clearStorageData} style={{ marginLeft: "10px" }}>
            캐시 초기화
          </button>
        </div>
      </S.ProfileLayout>
    );
  }

  return (
    <>
      <S.Banner>
        <div style={{ height: "220px", display: "flex", alignItems: "center" }} />
      </S.Banner>

      <S.ProfileLayout>
        <ProfileSidebar
          formData={{
            name: userProfile?.username || "이름",
            email: userProfile?.email || "이메일"
          }}
          profileImage={userProfile?.profileImage || DefaultProfileImg}
          isEditing={false}
          onImageChange={() => {}}
        />

        <S.DetailCard>
          <ProfileHeader />

          {!hasBusinessProfile && !isRegistering ? (
            <S.EmptyStateContainer>
              <S.EmptyStateMessage>등록된 기업 프로필이 없습니다</S.EmptyStateMessage>
              <S.EmptyStateButton onClick={handleRegister}>
                기업 프로필 등록하기
              </S.EmptyStateButton>
            </S.EmptyStateContainer>
          ) : (
            <>
              <BusinessInfo
                formData={editFormData}
                profileImage={profileImage}
                isEditing={isEditing || isRegistering}
                onEdit={handleEdit}
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {isEditing || isRegistering ? (
                <BusinessEditMode
                  formData={editFormData}
                  onInputChange={handleInputChange}
                />
              ) : (
                <BusinessViewMode formData={editFormData} />
              )}

              <BusinessActionButtons
                isEditing={isEditing}
                isRegistering={isRegistering}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                loading={registerMutation.isPending || updateMutation.isPending}
              />
            </>
          )}
        </S.DetailCard>
      </S.ProfileLayout>
    </>
  );
};

export default BusinessProfile;