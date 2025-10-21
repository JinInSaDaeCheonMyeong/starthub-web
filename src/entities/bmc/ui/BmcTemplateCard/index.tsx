import { ReactComponent as StartHubTemplate } from "@assets/images/templates/starthubBmc.svg";
import { ReactComponent as StartHubDarkTemplate } from "@assets/images/templates/darkBmc.svg";
import { ReactComponent as SimpleTemplate } from "@/assets/images/templates/simpleBmc.svg";
import { ReactComponent as ColorTemplate } from "@/assets/images/templates/colorBmc.svg";
import * as S from "./style";
import { useState } from "react";
import BusinessTemplateModal from "@/features/bmc/SessionModal";
import Portal from "@/shared/ui/Portal";
import { BmcTemplateType } from "@/entities/bmc/model/types";

const BmcTemplateCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<BmcTemplateType>("STARTHUB");

  const openModal = (templateType: BmcTemplateType) => {
    setSelectedTemplate(templateType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateSession = (projectName: string, templateType: BmcTemplateType) => {
    closeModal();
  };

  return (
    <>
      <S.Container>
        <S.Text>BMC를 작성해보세요!</S.Text>
        <S.BmcTemplateContainer>
          <S.ImageWrapper>
            <StartHubTemplate onClick={() => openModal("STARTHUB")} />
            <S.Title>StartHub</S.Title>
          </S.ImageWrapper>

          <S.ImageWrapper>
            <StartHubDarkTemplate onClick={() => openModal("STARTHUB_DARK")} />
            <S.Title>StartHub Dark</S.Title>
          </S.ImageWrapper>

          <S.ImageWrapper>
            <SimpleTemplate onClick={() => openModal("SIMPLE")} />
            <S.Title>Simple</S.Title>
          </S.ImageWrapper>

          <S.ImageWrapper>
            <ColorTemplate onClick={() => openModal("COLOR")} />
            <S.Title>Color</S.Title>
          </S.ImageWrapper>
        </S.BmcTemplateContainer>
      </S.Container>

      {isModalOpen && (
        <Portal>
          <BusinessTemplateModal
            isOpen={isModalOpen}
            templateType={selectedTemplate}
            onClose={closeModal}
            onGenerateBmc={handleCreateSession}
          />
        </Portal>
      )}
    </>
  );
};

export default BmcTemplateCard;
