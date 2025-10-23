import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BmcCanvas } from "@/widgets/bmc/BmcCanvas";
import * as S from "@/widgets/bmc/BmcCanvas/style";
import { useBmcData, useBmcCapture, useBmcEdit, BmcLoadingState, BmcActionButtons } from "@/features/bmc/detail";
import Header from "@/widgets/Header";

const BmcDetailPage = () => {
  const navigate = useNavigate();
  const { bmcData, setBmcData, isLoading } = useBmcData();
  const { canvasRef, hasAutoCaptureRef, captureBmcAndUpload, handleDownloadPDF } = useBmcCapture();
  const {
    isEditing,
    editedData,
    hasChanges,
    handleSectionChange,
    handleStartEdit,
    handleCancelEdit,
    handleSaveEdit,
  } = useBmcEdit(bmcData, setBmcData, captureBmcAndUpload);

  // BMC 데이터 로드 후 imageUrl이 없으면 자동 캡처
  useEffect(() => {
    if (bmcData && !isLoading && !bmcData.imageUrl && !hasAutoCaptureRef.current) {
      hasAutoCaptureRef.current = true;
      
      const timer = setTimeout(async () => {
        await captureBmcAndUpload(bmcData.id);
        hasAutoCaptureRef.current = false;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [bmcData, isLoading, hasAutoCaptureRef, captureBmcAndUpload]);

  const loadingState = BmcLoadingState({ isLoading, bmcData });
  if (loadingState) return loadingState;

  return (
    <S.Container>
      <Header />
      <BmcCanvas 
        ref={canvasRef} 
        bmcData={isEditing && editedData ? editedData : bmcData} 
        isEdit={isEditing}
        onSectionChange={handleSectionChange}
      />
      <BmcActionButtons
        isEditing={isEditing}
        hasChanges={hasChanges}
        onStartEdit={handleStartEdit}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
        onDownload={() => handleDownloadPDF(bmcData!)}
        onBackToList={() => navigate("/bmc")}
      />
    </S.Container>
  );
};

export default BmcDetailPage;