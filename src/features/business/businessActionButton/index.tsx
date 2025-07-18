import React from "react";
import * as S from "./style";

interface BusinessActionButtonsProps {
  isEditing: boolean;
  isRegistering: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

const BusinessActionButtons: React.FC<BusinessActionButtonsProps> = ({
  isEditing,
  isRegistering,
  onEdit,
  onSave,
  onCancel,
  loading,
}) => {
  if (isEditing || isRegistering) {
    return (
      <S.ButtonGroup>
        <S.CancelButton onClick={onCancel} disabled={loading}>
          취소
        </S.CancelButton>
        <S.SaveButton onClick={onSave} disabled={loading}>
          {loading ? (
            <>
              <S.LoadingSpinner />
              {isRegistering ? "등록 중..." : "저장 중..."}
            </>
          ) : (
            isRegistering ? "등록" : "저장"
          )}
        </S.SaveButton>
      </S.ButtonGroup>
    );
  }

  return (
    <S.ButtonGroup>
      <S.EditButton onClick={onEdit} disabled={loading}>
        수정
      </S.EditButton>
    </S.ButtonGroup>
  );
};

export default BusinessActionButtons;