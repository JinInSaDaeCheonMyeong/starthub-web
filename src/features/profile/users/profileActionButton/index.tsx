import { StartHubColors, StartHubFont } from "@/shared/design";
import { StartHubButton } from "@/shared/ui";

interface ProfileActionButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProfileActionButtons = ({
  isEditing,
  onSave,
  onCancel,
  loading = false
}: ProfileActionButtonsProps) => {
  if (!isEditing) {
    return null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
      <StartHubButton
        text="취소"
        width={77}
        height={36}
        backgroundColor={loading ? StartHubColors.Gray2 : StartHubColors.Gray3}
        typography={StartHubFont.Pretendard.Caption2.Medium}
        onClick={loading ? () => {} : onCancel}
        textTheme={loading ? StartHubColors.Gray4 : StartHubColors.Black1}
        customStyle={{
          marginTop: "20px",
        }}
        disabled={loading}
      />
      <StartHubButton
        text={loading ? "저장 중..." : "완료"}
        width={loading ? 90 : 77}
        height={36}
        backgroundColor={loading ? StartHubColors.Gray2 : StartHubColors.Primary}
        typography={StartHubFont.Pretendard.Caption2.Medium}
        onClick={loading ? () => {} : onSave}
        textTheme={loading ? StartHubColors.Gray4 : StartHubColors.White1}
        customStyle={{
          marginTop: "20px",
          position: "relative"
        }}
        disabled={loading}
      />
    </div>
  );
};

export default ProfileActionButtons;