import { ReactComponent as StartHubTemplate } from "@assets/images/templates/starthubBmc.svg";
import { ReactComponent as StartHubDarkTemplate } from "@assets/images/templates/darkBmc.svg";
import { ReactComponent as SimpleTemplate } from "@/assets/images/templates/simpleBmc.svg";
import { ReactComponent as ColorTemplate } from "@/assets/images/templates/colorBmc.svg";
import { useState } from "react";
import BusinessTemplateModal from "@/features/bmc/SessionModal";
import Portal from "@/shared/ui/Portal";
import { BmcTemplateType } from "@/entities/bmc/model/types";

const templates: {
  component: React.FC<React.SVGProps<SVGSVGElement>>;
  type: BmcTemplateType;
  title: string;
}[] = [
  { component: StartHubTemplate, type: "STARTHUB", title: "StartHub" },
  {
    component: StartHubDarkTemplate,
    type: "STARTHUB_DARK",
    title: "StartHub Dark",
  },
  { component: SimpleTemplate, type: "SIMPLE", title: "Simple" },
  { component: ColorTemplate, type: "COLOR", title: "Color" },
];

const BmcTemplateCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<BmcTemplateType>("STARTHUB");

  const openModal = (templateType: BmcTemplateType) => {
    setSelectedTemplate(templateType);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full mt-10">
        <p className="font-pt-h2-semibold mb-5">BMC를 작성해보세요!</p>

        {/* 모바일: 리스트 형태, 데스크탑: 카드 그리드 */}
        <div className="w-full">
          {/* 모바일 리스트 */}
          <div className="block lg:hidden w-full">
            <div className="space-y-3 mb-10">
              {templates.map(({ component: Svg, type, title }) => (
                <div
                  key={type}
                  onClick={() => openModal(type)}
                  className="flex items-center justify-between p-4 bg-white border border-hub-gray-3 rounded-lg cursor-pointer hover:bg-hub-gray-4 transition-colors"
                >
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 mr-4 flex items-center justify-center">
                      <Svg className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-pt-body2-medium text-hub-black-1">
                        {title} 템플릿
                      </h3>
                      <p className="font-pt-caption2-regular text-hub-gray-2">
                        BMC 작성하기
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 text-hub-gray-2">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 데스크탑 카드 그리드 */}
          <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {templates.map(({ component: Svg, type, title }) => (
              <div key={type} className="w-full max-w-[242px] mx-auto bg-hub-white-1">
                <Svg
                  onClick={() => openModal(type)}
                  className="
                    w-full h-[170px] rounded-[10px] border border-hub-gray-3
                    mb-0.5 cursor-pointer transition-opacity duration-300
                    hover:opacity-50
                  "
                />
                <p className="text-hub-black-1 font-pt-caption1-regular text-center lg:text-left">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Portal>
          <BusinessTemplateModal
            isOpen={isModalOpen}
            templateType={selectedTemplate}
            onClose={closeModal}
            onGenerateBmc={closeModal}
          />
        </Portal>
      )}
    </>
  );
};

export default BmcTemplateCard;
