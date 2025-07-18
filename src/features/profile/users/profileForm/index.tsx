import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as S from "./style";
import ProfileSidebar from "../profileSideBar";
import ProfileHeader from "../profileHeader";
import ProfileInfo from "../profileInfo";
import ProfileViewMode from "../profileViewMode";
import ProfileEditMode from "../profileEditMode";
import ProfileActionButtons from "../profileActionButton";
import type { ProfileFormData } from "@/entities/user/model/types.ts";
import DefaultProfileImg from "@/assets/images/defaultProfile.png";
import { userApi } from "@/entities/user/api/user";

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { data: userProfile, isLoading, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userApi.userProfile
  });

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    gender: "",
    birthDate: "",
    category: "",
    profileImage: "",
    description: "",
    interests: [],
    introduction: ""
  });

  const [editFormData, setEditFormData] = useState<ProfileFormData>(formData);

  useEffect(() => {
    if (userProfile) {
      const profileData: ProfileFormData = {
        name: userProfile.username || "",
        email: userProfile.email || "",
        gender: userProfile.gender === "MALE" ? "남자" : userProfile.gender === "FEMALE" ? "여자" : "",
        birthDate: userProfile.birth || "",
        category: "",
        profileImage: userProfile.profileImage || "",
        description: "",
        interests: [],
        introduction: ""
      };
      
      setFormData(profileData);
      setEditFormData(profileData);
    }
  }, [userProfile]);

  const profileImage = editFormData.profileImage || DefaultProfileImg;

  const handleEdit = () => {
    setIsEditing(true);
    setEditFormData(formData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditFormData(formData);
  };

  const handleSave = () => {
    setFormData(editFormData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditFormData(prev => ({
          ...prev,
          profileImage: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (result: string) => {
    setEditFormData(prev => ({
      ...prev,
      profileImage: result
    }));
  };

  if (isLoading) {
    return (
      <S.ProfileLayout>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          로딩 중...
        </div>
      </S.ProfileLayout>
    );
  }

  if (error) {
    return (
      <S.ProfileLayout>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          사용자 정보를 불러오는데 실패했습니다.
          <button onClick={() => refetch()} style={{ marginLeft: "10px" }}>
            다시 시도
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
          formData={formData}
          profileImage={profileImage}
          isEditing={isEditing}
          onImageChange={handleImageChange}
        />

        <S.DetailCard>
          <ProfileHeader/>

          <ProfileInfo
            formData={isEditing ? editFormData : formData}
            profileImage={profileImage}
            isEditing={isEditing}
            onEdit={handleEdit}
            onImageClick={handleImageClick}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {isEditing ? (
            <ProfileEditMode
              formData={editFormData}
              onInputChange={handleInputChange}
            />
          ) : (
            <ProfileViewMode formData={formData} />
          )}

          <ProfileActionButtons
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            loading={false}
          />
        </S.DetailCard>
      </S.ProfileLayout>
    </>
  );
};

export default ProfileForm;