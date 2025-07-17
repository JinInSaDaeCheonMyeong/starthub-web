import { StartHubTextField } from "@/shared/ui";
import { useState, useEffect } from "react";
import { ReactComponent as Logo } from "@assets/logo/logo.svg";
import * as S from './style';

interface BusinessTemplateModalProps {
  isOpen: boolean;
  templateType: string;
  onClose: () => void;
  onCreateBmc: (projectName: string, templateType: string) => void;
}

const BusinessTemplateModal = ({ isOpen, templateType, onClose, onCreateBmc }: BusinessTemplateModalProps) => {
  const [projectName, setProjectName] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && projectName.trim()) {
      handleCreate();
    }
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleCreate = () => {
    if (projectName.trim()) {
      onCreateBmc(projectName, templateType);
      setProjectName("");
      onClose();
    }
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
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
        
        <S.TextContainer>
          <Logo style={{ width: '96px', height: '39px'}}/>
          <S.Text>{templateType} 템플릿으로 BMC를 생성합니다</S.Text>
          <S.SubText>프로젝트 이름을 입력해주세요</S.SubText>
        </S.TextContainer>
        
        <StartHubTextField
          type="text"
          value={projectName}
          width={400}
          onChange={(e) => {
            setProjectName(e.target.value);
          }}
          placeholder="20자 이내로 입력해주세요"
          customStyle={{ maxlength:"20", height: "52px" }}
          onKeyDown={handleKeyDown}
        />
        
        <S.ButtonContainer>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.CreateButton 
            onClick={handleCreate}
            disabled={!projectName.trim()}
          >
            생성하기
          </S.CreateButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default BusinessTemplateModal;