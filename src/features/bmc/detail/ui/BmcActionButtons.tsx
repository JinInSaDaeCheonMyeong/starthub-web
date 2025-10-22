import { StartHubButton } from "@/shared/ui";
import { StartHubColors, StartHubFont } from "@/shared/design";
import * as S from "@/widgets/bmc/BmcCanvas/style";

interface BmcActionButtonsProps {
  isEditing: boolean;
  hasChanges: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onDownload: () => void;
  onBackToList: () => void;
}

export const BmcActionButtons = ({
  isEditing,
  hasChanges,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDownload,
  onBackToList,
}: BmcActionButtonsProps) => {
  return (
    <S.ActionButtons>
      {isEditing ? (
        <>
          <StartHubButton
            text="취소"
            width={200}
            onClick={onCancelEdit}
            backgroundColor={StartHubColors.White1}
            typography={StartHubFont.Pretendard.Caption1.Medium}
            customStyle={{
              border: `1px solid ${StartHubColors.Gray2}`,
              color: `${StartHubColors.Gray1}`,
            }}
          />
          <StartHubButton
            text="저장"
            width={200}
            onClick={onSaveEdit}
            backgroundColor={hasChanges ? StartHubColors.Primary : StartHubColors.Gray2}
            typography={StartHubFont.Pretendard.Caption1.Medium}
            disabled={!hasChanges}
            customStyle={!hasChanges ? {
              backgroundColor: StartHubColors.Gray2,
              color: StartHubColors.Gray1,
              cursor: 'not-allowed'
            } : undefined}
          />
        </>
      ) : (
        <>
          <StartHubButton
            text="목록으로 돌아가기"
            width={200}
            onClick={onBackToList}
            backgroundColor={StartHubColors.White1}
            typography={StartHubFont.Pretendard.Caption1.Medium}
            customStyle={{
              border: `1px solid ${StartHubColors.Gray2}`,
              color: `${StartHubColors.Gray1}`,
            }}
          />
          <StartHubButton
            text="BMC 다운로드"
            width={200}
            onClick={onDownload}
            backgroundColor={StartHubColors.Primary}
            typography={StartHubFont.Pretendard.Caption1.Medium}
          />
          <StartHubButton
            text="수정하기"
            width={200}
            onClick={onStartEdit}
            backgroundColor={StartHubColors.White1}
            typography={StartHubFont.Pretendard.Caption1.Medium}
            customStyle={{
              border: `1px solid ${StartHubColors.Primary}`,
              color: `${StartHubColors.Primary}`,
            }}
          />
        </>
      )}
    </S.ActionButtons>
  );
};