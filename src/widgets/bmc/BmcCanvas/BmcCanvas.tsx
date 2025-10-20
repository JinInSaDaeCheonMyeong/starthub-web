import { ComponentType, forwardRef, SVGProps } from "react";
import { BmcData } from "@/entities/bmc/model/types";
import { getBmcSectionConfig } from "@/entities/bmc/model/bmcTemplateConfig";
import * as S from "./style";

interface BmcCanvasProps {
  bmcData: BmcData | null;
  isEdit: boolean;
  onSectionChange?: (sectionKey: keyof BmcData, value: string) => void;
}

export const BmcCanvas = forwardRef<HTMLDivElement, BmcCanvasProps>(
  ({ bmcData, isEdit, onSectionChange }, ref) => {
    const templateType = bmcData?.templateType;
    const sectionConfig = getBmcSectionConfig(templateType);

    const renderBmcSections = () => {
      return Object.values(sectionConfig).map((config) => {
        const IconComponent = config.icon as ComponentType<
          SVGProps<SVGSVGElement>
        >;

        return isEdit === true ? (
          <S.BmcSection
            key={config.id}
            $config={config}
            $templateType={templateType}
          >
            <S.SectionHeader>
              <S.SectionTitle $config={config} $templateType={templateType}>
                {config.title}
              </S.SectionTitle>
              {templateType !== "SIMPLE" && (
                <S.SectionIcon $config={config} $templateType={templateType}>
                  {IconComponent && <IconComponent />}
                </S.SectionIcon>
              )}
            </S.SectionHeader>
            <S.EditableTextArea
              value={String(bmcData?.[config.id as keyof BmcData] || "")}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onSectionChange?.(config.id as keyof BmcData, e.target.value)
              }
              placeholder="내용을 입력하세요..."
            />
          </S.BmcSection>
        ) : (
          <S.BmcSection
            key={config.id}
            $config={config}
            $templateType={templateType}
          >
            <S.SectionHeader>
              <S.SectionTitle $config={config} $templateType={templateType}>
                {config.title}
              </S.SectionTitle>
              {templateType !== "SIMPLE" && (
                <S.SectionIcon $config={config} $templateType={templateType}>
                  {IconComponent && <IconComponent />}
                </S.SectionIcon>
              )}
            </S.SectionHeader>
            <S.SectionContent>
              {String(bmcData?.[config.id as keyof BmcData] || "")}
            </S.SectionContent>
          </S.BmcSection>
        );
      });
    };

    return (
      <>
        <S.PrintStyles />
        <div ref={ref} style={{ padding: 0 }}>
          <S.BmcCanvasHeaderWrapper>
            <S.BmcCanvasHeader>
              Business Model Canvas
              <span>{bmcData?.title}</span>
            </S.BmcCanvasHeader>
            <S.WaterMark>
              made by Start<span>Hub</span>
            </S.WaterMark>
          </S.BmcCanvasHeaderWrapper>
          <S.BmcCanvas>{renderBmcSections()}</S.BmcCanvas>
        </div>
      </>
    );
  }
);

BmcCanvas.displayName = "BmcCanvas";
