"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BmcCanvas } from "@/widgets/bmc/BmcCanvas";
import {
  useBmcData,
  useBmcCapture,
  useBmcEdit,
  BmcLoadingState,
  BmcActionButtons,
} from "@/features/bmc/detail";
import Header from "@/widgets/Header";

interface BmcDetailPageProps {
  id: string;
}

const BmcDetailPage = ({ id }: BmcDetailPageProps) => {
  const router = useRouter();
  const isMountedRef = useRef(true);
  const captureInProgressRef = useRef(false);
  const { bmcData, setBmcData, isLoading } = useBmcData(id);
  const {
    canvasRef,
    hasAutoCaptureRef,
    captureBmcAndUpload,
    handleDownloadPDF,
    isMobile,
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

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (
      bmcData &&
      !isLoading &&
      !bmcData.imageUrl &&
      !hasAutoCaptureRef.current &&
      !captureInProgressRef.current &&
      !isMobile
    ) {
      hasAutoCaptureRef.current = true;
      captureInProgressRef.current = true;

      timeoutId = setTimeout(async () => {
        if (!isMountedRef.current) {
          captureInProgressRef.current = false;
          return;
        }

        try {
          await captureBmcAndUpload(bmcData.id);
        } finally {
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
  }, [bmcData, isLoading, hasAutoCaptureRef, captureBmcAndUpload, isMobile]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadingState = BmcLoadingState({ isLoading, bmcData });
  if (loadingState) return loadingState;

  return (
    <div className="min-h-screen bg-hub-white-1 pt-[120px] sm:pt-[130px] md:pt-[140px] pb-4 sm:pb-6 lg:pb-[40px] px-2 sm:px-4 md:px-6 lg:px-[20px]">
      <Header />
      <div className="w-full flex flex-col items-center">
        <div className="w-full">
          <BmcCanvas
            ref={canvasRef}
            bmcData={isEditing && editedData ? editedData : bmcData}
            isEdit={isEditing}
            onSectionChange={handleSectionChange}
          />
        </div>
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex justify-center w-full px-2 sm:px-0">
          <BmcActionButtons
            isEditing={isEditing}
            hasChanges={hasChanges}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
            onDownload={() => handleDownloadPDF(bmcData!)}
            onBackToList={() => router.push("/bmc")}
          />
        </div>
      </div>
    </div>
  );
};

export default BmcDetailPage;
