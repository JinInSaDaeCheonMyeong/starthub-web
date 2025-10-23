import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BmcCanvas } from "@/widgets/bmc/BmcCanvas";
import * as S from "@/widgets/bmc/BmcCanvas/style";
import {
  useBmcData,
  useBmcCapture,
  useBmcEdit,
  BmcLoadingState,
  BmcActionButtons,
} from "@/features/bmc/detail";
import Header from "@/widgets/Header";

const BmcDetailPage = () => {
  const navigate = useNavigate();
  const isMountedRef = useRef(true);
  const captureInProgressRef = useRef(false);
  const { bmcData, setBmcData, isLoading } = useBmcData();
  const {
    canvasRef,
    hasAutoCaptureRef,
    captureBmcAndUpload,
    handleDownloadPDF,
  } = useBmcCapture();
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
    let timeoutId: NodeJS.Timeout | null = null;

    if (
      bmcData &&
      !isLoading &&
      !bmcData.imageUrl &&
      !hasAutoCaptureRef.current &&
      !captureInProgressRef.current
    ) {
      hasAutoCaptureRef.current = true;
      captureInProgressRef.current = true;

      timeoutId = setTimeout(async () => {
        // 컴포넌트 unmount 확인
        if (!isMountedRef.current) {
          captureInProgressRef.current = false;
          return;
        }

        try {
          await captureBmcAndUpload(bmcData.id);
        } finally {
          // 컴포넌트가 여전히 mounted 상태일 때만 업데이트
          if (isMountedRef.current) {
            captureInProgressRef.current = false;
          }
        }
      }, 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [bmcData, isLoading, hasAutoCaptureRef, captureBmcAndUpload]);

  // Cleanup: 컴포넌트 unmount 시 추적
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
