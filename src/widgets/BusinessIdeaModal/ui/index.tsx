import { StartHubTextField } from "@/shared/ui";
import { useState, useEffect } from "react";
import { ReactComponent as Logo } from "@assets/logo/logo.svg";
import * as S from './style';
import { useCreateSessions } from "../model/useCreateSessions";

interface BusinessTemplateModalProps {
  isOpen: boolean;
  templateType: string;
  onClose: () => void;
  onGenerateBmc: (projectName: string, templateType: string) => void;
}

const BusinessTemplateModal = ({ isOpen, templateType, onClose, onGenerateBmc }: BusinessTemplateModalProps) => {
  const [title, setTitle] = useState("");
  const { createSession } = useCreateSessions();
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && title.trim()) {
      handleGenerate();
    }
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleGenerate = () => {
    if (title.trim()) {
      onGenerateBmc(title, templateType);
      setTitle("");
      onClose();
    }
    createSession({ title })
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        
        <S.TextContainer>
          <Logo style={{ width: '96px', height: '39px'}}/>
          <S.Text>{templateType} 템플릿으로 BMC를 생성합니다</S.Text>
          <S.SubText>프로젝트 이름을 입력해주세요</S.SubText>
        </S.TextContainer>
        
        <StartHubTextField
          type="text"
          value={title}
          width={360}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="20자 이내로 입력해주세요"
          onKeyDown={handleKeyDown}
        />
        
        <S.ButtonContainer>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.CreateButton 
            onClick={handleGenerate}
            disabled={!title.trim()}
          >
            생성하기
          </S.CreateButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default BusinessTemplateModal;