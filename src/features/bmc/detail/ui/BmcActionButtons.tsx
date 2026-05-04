import { StartHubButton } from "@/shared/ui";

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
    <div className="flex gap-[10px]">
      {isEditing ? (
        <>
          <StartHubButton
            text="취소"
            onClick={onCancelEdit}
            backgroundColor="#FFFFFF"
            textTheme="#242424"
            className="
              w-[200px]
              font-pt-caption1-medium
              border border-hub-gray-2
            "
          />

          <StartHubButton
            text="저장"
            onClick={onSaveEdit}
            disabled={!hasChanges}
            backgroundColor={hasChanges ? "#2466F4" : "#9B9B9B"}
            textTheme={hasChanges ? "#FFFFFF" : "#242424"}
            className="
              w-[200px]
              font-pt-caption1-medium
            "
          />
        </>
      ) : (
        <>
          <StartHubButton
            text="목록으로 돌아가기"
            onClick={onBackToList}
            backgroundColor="#FFFFFF"
            textTheme="#242424"
            className="
              w-[200px]
              font-pt-caption1-medium
              border border-hub-gray-2
            "
          />

          <StartHubButton
            text="BMC 다운로드"
            onClick={onDownload}
            backgroundColor="#2466F4"
            textTheme="#FFFFFF"
            className="
              w-[200px]
              font-pt-caption1-medium
            "
          />

          <StartHubButton
            text="수정하기"
            onClick={onStartEdit}
            backgroundColor="#FFFFFF"
            textTheme="#2466F4"
            className="
              w-[200px]
              font-pt-caption1-medium
              border border-hub-primary
            "
          />
        </>
      )}
    </div>
  );
};
