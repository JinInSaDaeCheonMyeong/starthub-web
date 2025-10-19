import React from "react";
import * as S from "./style";
import { UserBmc } from "../../types";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { formatBmcContent } from "../../utils/textFormatter";
import { BMC_ICONS } from "./icons";
import { BMC_ITEMS } from "./constants";

interface BmcSidebarProps {
  userBmc: UserBmc;
}

const BmcSidebar: React.FC<BmcSidebarProps> = ({ userBmc }) => {
  const [openItems, setOpenItems] = React.useState<{ [key: number]: boolean }>({});
  const [bmcData, setBmcData] = React.useState<UserBmc>(userBmc);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const toggleItem = async (index: number) => {
    const isOpening = !openItems[index];
    setOpenItems(prev => ({ ...prev, [index]: !prev[index] }));

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
    <S.BmcSidebar>
      {BMC_ITEMS.map((item, index) => {
        const { title, subtitle, field, iconType } = item;
        const isOpen = openItems[index];
        const content = bmcData[field];
        const Icon = isOpen ? BMC_ICONS[iconType].blue : BMC_ICONS[iconType].default;

        return (
          <S.BmcItem key={index}>
            <S.BmcItemHeader onClick={() => toggleItem(index)} $isOpen={isOpen}>
              <S.ToggleIcon $isOpen={isOpen}>▶</S.ToggleIcon>
              <S.BmcItemTitle>
                <Icon />
                {title} <S.BmcItemSubtitle>{subtitle}</S.BmcItemSubtitle>
              </S.BmcItemTitle>
            </S.BmcItemHeader>
            {isOpen && (
              <S.BmcItemContent>
                {isLoading && !hasLoaded ? "로딩 중..." : formatBmcContent(content)}
              </S.BmcItemContent>
            )}
          </S.BmcItem>
        );
      })}
    </S.BmcSidebar>
  );
};

export default BmcSidebar;
