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
      {/* Container */}
      <div className="w-[1024px] mt-10">
        {/* Text */}
        <p className="font-pt-h2-semibold mb-5">BMC를 작성해보세요!</p>

        {/* BmcTemplateContainer */}
        <div className="flex justify-between w-[1024px]">
          {templates.map(({ component: Svg, type, title }) => (
            // ImageWrapper
            <div key={type} className="w-[242px] bg-hub-white-1">
              <Svg
                onClick={() => openModal(type)}
                className="
                  w-[242px] h-[170px] rounded-[10px] border border-hub-gray-3
                  mb-0.5 cursor-pointer transition-opacity duration-300
                  hover:opacity-50
                "
              />
              <p className="text-hub-black-1 font-pt-caption1-regular">
                {title}
              </p>
            </div>
          ))}
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
