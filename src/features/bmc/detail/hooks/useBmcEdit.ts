import { useState } from "react";
import { toast } from "react-toastify";
import { bmcApi } from "@/entities/bmc/api/bmc";
import { BmcData } from "@/entities/bmc/model/types";

export const useBmcEdit = (
  bmcData: BmcData | null,
  setBmcData: (data: BmcData) => void,
  captureBmcAndUpload?: (bmcId: number) => Promise<void>
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<BmcData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const checkForChanges = (
    originalData: BmcData,
    editedData: BmcData
  ): boolean => {
    return (
      originalData.title !== editedData.title ||
      originalData.keyPartners !== editedData.keyPartners ||
      originalData.keyActivities !== editedData.keyActivities ||
      originalData.valueProposition !== editedData.valueProposition ||
      originalData.keyResources !== editedData.keyResources ||
      originalData.customerRelationships !== editedData.customerRelationships ||
      originalData.channels !== editedData.channels ||
      originalData.customerSegments !== editedData.customerSegments ||
      originalData.costStructure !== editedData.costStructure ||
      originalData.revenueStreams !== editedData.revenueStreams
    );
  };

  const handleSectionChange = (sectionKey: keyof BmcData, value: string) => {
    if (!editedData || !bmcData) return;

    const updatedData = {
      ...editedData,
      [sectionKey]: value,
    };

    setEditedData(updatedData);
    setHasChanges(checkForChanges(bmcData, updatedData));
  };

  const handleStartEdit = () => {
    setEditedData(bmcData);
    setIsEditing(true);
    setHasChanges(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData(null);
    setHasChanges(false);
  };

  const handleSaveEdit = async () => {
    if (!editedData || !bmcData) return;

    try {
      await bmcApi.modifyBmc({
        bmcId: bmcData.id,
        templateType: bmcData.templateType,
        title: editedData.title,
        keyPartners: editedData.keyPartners,
        keyActivities: editedData.keyActivities,
        valueProposition: editedData.valueProposition,
        keyResources: editedData.keyResources,
        customerRelationships: editedData.customerRelationships,
        channels: editedData.channels,
        customerSegments: editedData.customerSegments,
        costStructure: editedData.costStructure,
        revenueStreams: editedData.revenueStreams,
      });

      const updatedResponse = await bmcApi.getCanvasesDetail(String(bmcData.id));
      setBmcData(updatedResponse.data);
      
      setIsEditing(false);
      setEditedData(null);
      setHasChanges(false);
      toast.success("BMC가 성공적으로 수정되었습니다!");

      if (captureBmcAndUpload) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // DOM 업데이트 대기
        await captureBmcAndUpload(bmcData.id);
      }
    } catch (error) {
      console.error("BMC 수정 실패:", error);
      toast.error("BMC 수정에 실패했습니다.");
    }
  };

  return {
    isEditing,
    editedData,
    hasChanges,
    handleSectionChange,
    handleStartEdit,
    handleCancelEdit,
    handleSaveEdit,
  };
};
