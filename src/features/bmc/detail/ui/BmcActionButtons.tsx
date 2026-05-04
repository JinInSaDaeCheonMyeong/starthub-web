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
            className="
              w-[200px]
              bg-hub-white-1
              text-hub-gray-1
              font-pt-caption1-medium
              border border-hub-gray-2
            "
          />

          <StartHubButton
            text="저장"
            onClick={onSaveEdit}
            disabled={!hasChanges}
            className={`
              w-[200px]
              font-pt-caption1-medium
              ${
                hasChanges
                  ? "bg-hub-primary text-hub-white-1"
                  : "bg-hub-gray-2 text-hub-gray-1 cursor-not-allowed"
              }
            `}
          />
        </>
      ) : (
        <>
          <StartHubButton
            text="목록으로 돌아가기"
            onClick={onBackToList}
            className="
              w-[200px]
              bg-hub-white-1
              text-hub-gray-1
              font-pt-caption1-medium
              border border-hub-gray-2
            "
          />

          <StartHubButton
            text="BMC 다운로드"
            onClick={onDownload}
            className="
              w-[200px]
              bg-hub-primary
              text-hub-white-1
              font-pt-caption1-medium
            "
          />

          <StartHubButton
            text="수정하기"
            onClick={onStartEdit}
            className="
              w-[200px]
              bg-hub-white-1
              text-hub-primary
              font-pt-caption1-medium
              border border-hub-primary
            "
          />
        </>
      )}
    </div>
  );
};
