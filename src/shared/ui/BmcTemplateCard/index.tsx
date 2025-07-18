import StartHubTemplate from "@assets/images/BMC template - starthub ver.png";
import StartHubDarkTemplate from "@assets/images/BMC template - dark ver.png";
import SimpleTemplate from '@assets/images/BMC template - simple.png';
import * as S from './style';
import { ReactComponent as Plus } from "@assets/icons/plus.svg";
import { useState } from "react";
import BusinessTemplateModal from "@/widgets/BusinessIdeaModal/ui/BusinessTemplateModal"; // 올바른 import
import Portal from "@/shared/ui/BmcTemplateCard/Portal/Portal";

const BmcTemplateCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const openModal = (templateType: string) => {
    setSelectedTemplate(templateType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate("");
  };

  const handleCreateBmc = (projectName: string, templateType: string) => {
    console.log(`프로젝트: ${projectName}, 템플릿: ${templateType}`);
    closeModal();
  };

  return (
    <>
      <S.Container>
        <S.Text>BMC를 작성해보세요!</S.Text>
        <S.BmcTemplateContainer>
          <S.ImageWrapper>
            <S.ButtonContainer onClick={() => openModal('새로운')}>
              <S.PlusIcon>
                <Plus/>
              </S.PlusIcon>
            </S.ButtonContainer>
            <S.Title>새로 만들기</S.Title>
          </S.ImageWrapper>

          <S.ImageWrapper>
            <img 
              src={StartHubTemplate} 
              onClick={() => openModal('StartHub')}
              alt="StartHub Template"
            />
            <S.Title>StartHub</S.Title>
          </S.ImageWrapper>

          <S.ImageWrapper>
            <img 
              src={StartHubDarkTemplate} 
              onClick={() => openModal('StartHub Dark')}
              alt="StartHub Dark Template"
            />
            <S.Title>StartHub Dark</S.Title>
          </S.ImageWrapper>

          <S.ImageWrapper>
            <img 
              src={SimpleTemplate} 
              onClick={() => openModal('Simple')}
              alt="Simple Template"
            />
            <S.Title>Simple</S.Title>
          </S.ImageWrapper>
        </S.BmcTemplateContainer>
      </S.Container>

      {isModalOpen && (
        <Portal>
          <BusinessTemplateModal
            isOpen={isModalOpen}
            templateType={selectedTemplate}
            onClose={closeModal}
            onCreateBmc={handleCreateBmc}
          />
        </Portal>
      )}
    </>
  );
};

export default BmcTemplateCard;