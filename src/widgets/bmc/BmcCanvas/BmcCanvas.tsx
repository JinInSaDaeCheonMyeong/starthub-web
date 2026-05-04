import { ComponentType, forwardRef, SVGProps } from "react";
import { BmcData } from "@/entities/bmc/model/types";
import { getBmcSectionConfig } from "@/entities/bmc/model/bmcTemplateConfig";
import { BmcSectionConfig } from "@/entities/bmc/model/bmcTemplateConfig";
import { BmcTemplateType } from "@/entities/bmc/model/types";
import { createGlobalStyle } from "styled-components";

const PrintStyles = createGlobalStyle`
  @media print {
    @page { size: 1300px auto; margin: 0; }
    body { margin: 0; padding: 0; background: white; user-select: auto; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; page-break-inside: avoid; }
  }
`;

const getSectionTitleColor = (
  templateType?: BmcTemplateType,
  config?: BmcSectionConfig,
) => {
  switch (templateType) {
    case "STARTHUB":
      return "var(--hub-primary)";
    case "STARTHUB_DARK":
      return "var(--hub-gray-1)";
    case "SIMPLE":
      return "var(--hub-black-1)";
    case "COLOR":
      return config?.color ?? "var(--hub-black-1)";
    default:
      return "var(--hub-black-1)";
  }
};

const getIconFillColor = (
  templateType?: BmcTemplateType,
  config?: BmcSectionConfig,
) => {
  switch (templateType) {
    case "STARTHUB":
      return "var(--hub-primary)";
    case "STARTHUB_DARK":
      return "var(--hub-gray-1)";
    case "SIMPLE":
      return "var(--hub-black-1)";
    case "COLOR":
      return config?.color ?? "var(--hub-black-1)";
    default:
      return "var(--hub-black-1)";
  }
};

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
        const titleColor = getSectionTitleColor(templateType, config);
        const iconFill = getIconFillColor(templateType, config);

        return (
          <div
            key={config.id}
            className="bg-hub-white-1 rounded-lg p-[14px] min-h-[200px] flex flex-col relative transition-all duration-200"
            style={{
              gridArea: config.gridArea,
              border: `2px solid ${config.color}`,
            }}
          >
            {/* 섹션 헤더 */}
            <div className="flex justify-between gap-2 mb-3">
              <p
                className="font-pt-body2-semibold text-[16px] font-semibold m-0"
                style={{ color: titleColor }}
              >
                {config.title}
              </p>
              {templateType !== "SIMPLE" && IconComponent && (
                <div
                  className="text-[20px] flex items-center [&_svg]:w-[18px] [&_svg]:h-[18px]"
                  style={{
                    ["--icon-fill" as string]: iconFill,
                  }}
                >
                  <IconComponent
                    style={{
                      ["--fill-color" as string]: iconFill,
                    }}
                    // SVG path fill은 인라인 style로 처리
                  />
                </div>
              )}
            </div>

            {/* 내용 */}
            {isEdit ? (
              <textarea
                value={String(bmcData?.[config.id as keyof BmcData] || "")}
                onChange={(e) =>
                  onSectionChange?.(config.id as keyof BmcData, e.target.value)
                }
                placeholder="내용을 입력하세요..."
                className="flex-1 text-[14px] leading-[1.6] text-hub-black-1 font-pt-body2-regular border border-hub-gray-3 rounded px-2 py-2 resize-y min-h-[100px] outline-none focus:border-hub-primary placeholder:text-hub-gray-2 whitespace-pre-wrap break-words"
              />
            ) : (
              <div className="flex-1 text-[14px] leading-[1.6] text-hub-black-1 font-pt-body2-regular select-text cursor-text whitespace-pre-wrap break-words empty:before:content-['내용이_없습니다.'] empty:before:text-hub-gray-2">
                {String(bmcData?.[config.id as keyof BmcData] || "")}
              </div>
            )}
          </div>
        );
      });
    };

    return (
      <>
        <PrintStyles />
        <div ref={ref} style={{ padding: 0 }}>
          {/* 캔버스 헤더 */}
          <div className="flex justify-between items-center w-full max-w-[1400px] mx-auto mb-5 print:flex print:max-w-[1220px] print:w-[1220px]">
            <p className="font-ws-title2 text-hub-black-1 m-0">
              Business Model Canvas
              <span className="font-pt-body2-medium ml-[10px]">
                {bmcData?.title}
              </span>
            </p>
            <p className="font-ws-body3 text-hub-black-1">
              made by Start<span className="text-hub-primary">Hub</span>
            </p>
          </div>

          {/* BMC 그리드 */}
          <div
            className="grid gap-[10px] mx-auto max-w-[1400px] w-full bg-hub-white-1 box-border print:max-w-[1220px] print:w-[1220px] print:gap-[10px]"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gridTemplateRows: "auto auto auto",
              gridTemplateAreas: `
                "key-partners key-activities value-proposition customer-relationships customer-segments"
                "key-partners key-resources value-proposition channels customer-segments"
                "cost-structure cost-structure revenue-streams revenue-streams revenue-streams"
              `,
            }}
          >
            {renderBmcSections()}
          </div>
        </div>
      </>
    );
  },
);

BmcCanvas.displayName = "BmcCanvas";
