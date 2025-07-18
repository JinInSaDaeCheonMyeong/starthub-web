// import { useRef } from "react";
// import * as S from "./style";
// import { StartHubColors, StartHubFont } from "@/shared/design";
// import { StartHubButton } from "@/shared/ui";

// interface ProfileSidebarProps {
//   formData?: {
//     name?: string;
//     email?: string;
//     profileImage?: string;
//   };
//   profileImage: string;
//   isEditing: boolean;
//   onImageChange: (result: string) => void;
// }

// const ProfileSidebar = ({ formData, profileImage, isEditing, onImageChange }: ProfileSidebarProps) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleImageClick = () => {
//     if (isEditing) {
//       fileInputRef.current?.click();
//     }
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const result = e.target?.result as string;
//         onImageChange(result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <S.SideCard>
//       <div style={{ position: "relative", cursor: isEditing ? "pointer" : "default" }}>
//         <S.ProfileImage 
//           src={profileImage}
//           alt="Profile"
//           onClick={handleImageClick}
//         />
//       </div>
      
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         style={{ display: "none" }}
//       />
      
//       <S.ProfileName>{formData?.name}</S.ProfileName>
//       <S.ProfileEmail>{formData?.email}</S.ProfileEmail>

//       <S.PolicySection>
//         <S.PolicyTitle>서비스 운영 정책</S.PolicyTitle>
//         <S.PolicyItem>이용약관</S.PolicyItem>
//       </S.PolicySection>

//       <S.LogoutButtonWrapper>
//         <S.LogoutButtonLine></S.LogoutButtonLine>
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <StartHubButton
//             text="로그아웃"
//             width={100}
//             height={36}
//             backgroundColor={StartHubColors.White1}
//             typography={StartHubFont.Pretendard.Caption1.Medium}
//             onClick={() => {
//               console.log("logout click");
//             }}
//             textTheme={StartHubColors.Error}
//             customStyle={{ padding: "0" }}
//           />
//         </div>
//       </S.LogoutButtonWrapper>
//     </S.SideCard>
//   );
// };

// export default ProfileSidebar;


import { useRef } from "react";
import * as S from "./style";
import { StartHubColors, StartHubFont } from "@/shared/design";
import { StartHubButton } from "@/shared/ui";

interface ProfileSidebarProps {
  formData?: {
    name?: string;
    email?: string;
    profileImage?: string;
  };
  profileImage: string;
  isEditing: boolean;
  onImageChange: (result: string) => void;
}

const ProfileSidebar = ({ formData, profileImage, isEditing, onImageChange }: ProfileSidebarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <S.SideCard>
      <div style={{ position: "relative", cursor: isEditing ? "pointer" : "default" }}>
        <S.ProfileImage 
          src={profileImage}
          alt="Profile"
          onClick={handleImageClick}
        />
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      
      <S.ProfileName>{formData?.name}</S.ProfileName>
      <S.ProfileEmail>{formData?.email}</S.ProfileEmail>

      <S.PolicySection>
        <S.PolicyTitle>서비스 운영 정책</S.PolicyTitle>
        <S.PolicyItem>이용약관</S.PolicyItem>
      </S.PolicySection>

      <S.LogoutButtonWrapper>
        <S.LogoutButtonLine></S.LogoutButtonLine>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <StartHubButton
            text="로그아웃"
            width={100}
            height={36}
            backgroundColor={StartHubColors.White1}
            typography={StartHubFont.Pretendard.Caption1.Medium}
            onClick={() => {
              console.log("logout click");
            }}
            textTheme={StartHubColors.Error}
            customStyle={{ padding: "0" }}
          />
        </div>
      </S.LogoutButtonWrapper>
    </S.SideCard>
  );
};

export default ProfileSidebar;