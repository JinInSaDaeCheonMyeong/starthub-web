import React from "react";
import * as S from "./style";

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  message = "로딩 중입니다..."
}) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.Spinner />
        <S.Message>{message}</S.Message>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default LoadingModal;
