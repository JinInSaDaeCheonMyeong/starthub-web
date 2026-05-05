import React from "react";
import { UserBmc } from "../../types";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { formatBmcContent } from "../../utils/textFormatter";
import { BMC_ICONS } from "./icons";
import { BMC_ITEMS } from "./constants";

interface BmcSidebarProps {
  userBmc: UserBmc;
}

const BmcSidebar: React.FC<BmcSidebarProps> = ({ userBmc }) => {
  const [openItems, setOpenItems] = React.useState<{ [key: number]: boolean }>(
    {},
  );
  const [bmcData, setBmcData] = React.useState<UserBmc>(userBmc);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const toggleItem = async (index: number) => {
    const isOpening = !openItems[index];
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));

    if (isOpening && userBmc.id && !hasLoaded) {
      setIsLoading(true);
      try {
        const response = await bmcApi.getCanvasesDetail(String(userBmc.id));
        setBmcData({
          ...userBmc,
          customerSegments: response.data.customerSegments,
          valueProposition: response.data.valueProposition,
          channels: response.data.channels,
          customerRelationships: response.data.customerRelationships,
          keyResources: response.data.keyResources,
          keyActivities: response.data.keyActivities,
          keyPartners: response.data.keyPartners,
          costStructure: response.data.costStructure,
          revenueStreams: response.data.revenueStreams,
        });
        setHasLoaded(true);
      } catch (error) {
        console.error("Failed to load BMC data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    // BmcSidebar - 반응형
    <div
      className="
      w-full lg:sticky lg:top-[170px] lg:w-[350px] lg:flex-shrink-0 p-4 sm:p-5
      border border-hub-gray-3 rounded-[8px] sm:rounded-[10px] bg-hub-white-1
      lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:self-start
      scrollbar-hide
    "
    >
      {BMC_ITEMS.map((item, index) => {
        const { title, subtitle, field, iconType } = item;
        const isOpen = openItems[index];
        const content = bmcData[field];
        const Icon = isOpen
          ? BMC_ICONS[iconType].blue
          : BMC_ICONS[iconType].default;

        return (
          // BmcItem
          <div key={index} className="mb-2">
            {/* BmcItemHeader */}
            <div
              onClick={() => toggleItem(index)}
              className={`
                flex items-center gap-2 cursor-pointer p-3 rounded-lg transition-all duration-200
                hover:bg-hub-gray-4
                ${isOpen ? "[&_div]:text-hub-primary [&_span]:text-hub-primary" : ""}
              `}
            >
              {/* ToggleIcon */}
              <span
                className={`
                  text-sm text-hub-gray-2 transition-transform duration-200
                  ${isOpen ? "rotate-90" : "rotate-0"}
                `}
              >
                ▶
              </span>

              {/* BmcItemTitle */}
              <div className="flex items-center gap-1.5 font-pt-body2-medium text-hub-black-1 [&_svg]:w-4 [&_svg]:h-4">
                <Icon />
                {title}
                {/* BmcItemSubtitle */}
                <span className="font-pt-caption1-regular text-hub-gray-2">
                  {subtitle}
                </span>
              </div>
            </div>

            {/* BmcItemContent */}
            {isOpen && (
              <div className="py-3 pr-4 pl-8 font-pt-caption1-regular text-hub-black-1 leading-[1.5]">
                {isLoading && !hasLoaded
                  ? "로딩 중..."
                  : formatBmcContent(content)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BmcSidebar;
