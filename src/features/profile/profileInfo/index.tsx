import * as S from "./style";
import camera from "@/assets/images/camera.fill.svg?url"
import { StartHubColors } from "@/shared/design";

interface ProfileFormData {
  name: string;
  email: string;
  gender: "남자" | "여자" | "";
  birthDate: string;
  category: string;
  profileImage?: string;
  description: string;
}

interface ProfileInfoProps {
  formData?: ProfileFormData; // 옵셔널로 변경
  profileImage: string;
  isEditing: boolean;
  onEdit: () => void;
  onImageClick: () => void;
}

const ProfileInfo = ({ formData, profileImage, isEditing, onEdit, onImageClick }: ProfileInfoProps) => {

  return (
    <S.Profile>
      <div style={{ position: "relative", cursor: isEditing ? "pointer" : "default" }}>
        <S.ProfileImageLarge 
          src={profileImage} 
          alt="Profile"
          onClick={onImageClick}
        />
        {isEditing && (
          <div
            onClick={onImageClick}
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "28px",
              height: "28px",
              backgroundColor: StartHubColors.Primary,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: `2px solid ${StartHubColors.White1}`
            }}
          >
            <img src={camera}></img>
          </div>
        )}
      </div>
      
      <div>
        <S.ProfileTitle>
          {formData?.name || "이름 없음"}
          {!isEditing && (
            <S.EditIcon 
              onClick={onEdit}
              style={{ cursor: "pointer" }}
            />
          )}
        </S.ProfileTitle>
        {/* <S.ProfileSubtitle>
          {formData?.description || "소개글 없음"}
        </S.ProfileSubtitle> */}
      </div>
    </S.Profile>
  );
};

export default ProfileInfo;