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
      return "#2466F4";
    case "STARTHUB_DARK":
      return "#242424";
    case "SIMPLE":
      return "#000000";
    case "COLOR":
      return config?.color ?? "#000000";
    default:
      return "#000000";
  }
};

const getIconFillColor = (
  templateType?: BmcTemplateType,
  config?: BmcSectionConfig,
) => {
  switch (templateType) {
    case "STARTHUB":
      return "#2466F4";
    case "STARTHUB_DARK":
      return "#242424";
    case "SIMPLE":
      return "#000000";
    case "COLOR":
      return config?.color ?? "#000000";
    default:
      return "#000000";
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
            className="bg-hub-white-1 rounded-lg p-3 sm:p-[14px] min-h-[150px] sm:min-h-[200px] flex flex-col relative transition-all duration-200 w-full"
            style={{
              gridArea: config.gridArea,
              border: `2px solid ${config.color}`,
            }}
          >
            {/* 섹션 헤더 */}
            <div className="flex justify-between gap-2 mb-2 sm:mb-3">
              <p
                className="font-pt-body2-semibold text-sm sm:text-[16px] font-semibold m-0"
                style={{ color: titleColor }}
              >
                {config.title}
              </p>
              {templateType !== "SIMPLE" && IconComponent && (
                <div
                  className="text-[16px] sm:text-[20px] flex items-center [&_svg]:w-[16px] [&_svg]:h-[16px] sm:[&_svg]:w-[18px] sm:[&_svg]:h-[18px]"
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
                className="flex-1 text-xs sm:text-[14px] leading-[1.6] text-hub-black-1 font-pt-body2-regular border border-hub-gray-3 rounded px-2 py-2 resize-y min-h-[80px] sm:min-h-[100px] outline-none focus:border-hub-primary placeholder:text-hub-gray-2 whitespace-pre-wrap break-words"
              />
            ) : (
              <div className="flex-1 text-xs sm:text-[14px] leading-[1.6] text-hub-black-1 font-pt-body2-regular select-text cursor-text whitespace-pre-wrap break-words empty:before:content-['내용이_없습니다.'] empty:before:text-hub-gray-2">
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
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full mb-4 sm:mb-5 print:flex print:max-w-[1220px] print:w-[1220px] gap-2 sm:gap-0 px-2 sm:px-4 lg:px-6">
            <div className="flex flex-col">
              <h1 className="font-ws-title2 text-hub-black-1 m-0 text-lg sm:text-xl lg:text-2xl">
                Business Model Canvas
              </h1>
              <span className="font-pt-body2-medium text-hub-black-1 text-sm sm:text-base">
                {bmcData?.title}
              </span>
            </div>
            <p className="font-ws-body3 text-hub-black-1 text-xs sm:text-sm">
              made by Start<span className="text-hub-primary">Hub</span>
            </p>
          </div>

          {/* BMC 그리드 */}
          <div
            className="
              flex flex-col gap-3
              md:grid md:gap-[10px]
              w-full bg-hub-white-1 box-border px-2 sm:px-4 lg:px-6
              print:max-w-[1220px] print:w-[1220px] print:gap-[10px] print:grid print:mx-auto print:px-0
            "
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
