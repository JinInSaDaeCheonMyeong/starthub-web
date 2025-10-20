import { useRef, useCallback } from 'react';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import { bmcApi } from '@/entities/bmc/api/bmc';
import { BmcData } from '@/entities/bmc/model/types';
import { StartHubColors } from '@/shared/design';

export const useBmcCapture = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const hasAutoCaptureRef = useRef(false);

  const captureBmcAndUpload = useCallback(async (bmcId: number) => {
    if (!canvasRef.current) {
      return;
    }

    try {
      const TARGET_WIDTH = 1300;
      const originalElement = canvasRef.current;
      const wrapper = document.createElement('div');
      wrapper.style.padding = '40px';
      wrapper.style.backgroundColor = `${StartHubColors.White1}`;
      wrapper.style.display = 'inline-block';
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      
      const clone = originalElement.cloneNode(true) as HTMLElement;
      const contentWidth = TARGET_WIDTH - 80;
      clone.style.width = `${contentWidth}px`;
      clone.style.maxWidth = `${contentWidth}px`;
      clone.style.minWidth = `${contentWidth}px`;
      
      const headerWrapper = clone.querySelector('[class*="BmcCanvasHeaderWrapper"]') as HTMLElement;
      if (headerWrapper) {
        headerWrapper.style.display = 'flex';
        headerWrapper.style.justifyContent = 'space-between';
        headerWrapper.style.alignItems = 'center';
        headerWrapper.style.width = `${contentWidth}px`;
        headerWrapper.style.maxWidth = `${contentWidth}px`;
        headerWrapper.style.margin = '0 auto 20px auto';
      }
      
      const bmcCanvas = clone.querySelector('[class*="BmcCanvas"]') as HTMLElement;
      if (bmcCanvas) {
        bmcCanvas.style.width = `${contentWidth}px`;
        bmcCanvas.style.maxWidth = `${contentWidth}px`;
        bmcCanvas.style.margin = '0 auto';
      }
      
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(wrapper, {
        backgroundColor: `${StartHubColors.White1}`,
        useCORS: true,
        allowTaint: true,
        scale: 2,
        logging: false,
        width: wrapper.offsetWidth,
        height: wrapper.offsetHeight,
      });

      document.body.removeChild(wrapper);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/jpeg', 0.95);
      });

      const formData = new FormData();
      formData.append('image', blob, 'bmc-canvas.jpg');

      await bmcApi.uploadImage(bmcId, formData);
    } catch {
      toast.error('BMC 수정에 실패했습니다.');
    }
  }, []);

  const handleDownloadPDF = useCallback(async (bmcData: BmcData) => {
    if (!canvasRef.current || !bmcData) {
      toast.error("다운로드할 수 없습니다.");
      return;
    }

    try {
      const TARGET_WIDTH = 1300;
      const originalElement = canvasRef.current;
      const wrapper = document.createElement('div');
      wrapper.style.padding = '40px';
      wrapper.style.backgroundColor = `${StartHubColors.White1}`;
      wrapper.style.display = 'inline-block';
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      
      const clone = originalElement.cloneNode(true) as HTMLElement;
      const contentWidth = TARGET_WIDTH - 80;
      clone.style.width = `${contentWidth}px`;
      clone.style.maxWidth = `${contentWidth}px`;
      clone.style.minWidth = `${contentWidth}px`;
      
      const headerWrapper = clone.querySelector('[class*="BmcCanvasHeaderWrapper"]') as HTMLElement;
      if (headerWrapper) {
        headerWrapper.style.display = 'flex';
        headerWrapper.style.justifyContent = 'space-between';
        headerWrapper.style.alignItems = 'center';
        headerWrapper.style.width = `${contentWidth}px`;
        headerWrapper.style.maxWidth = `${contentWidth}px`;
        headerWrapper.style.margin = '0 auto 20px auto';
      }
      
      const bmcCanvas = clone.querySelector('[class*="BmcCanvas"]') as HTMLElement;
      if (bmcCanvas) {
        bmcCanvas.style.width = `${contentWidth}px`;
        bmcCanvas.style.maxWidth = `${contentWidth}px`;
        bmcCanvas.style.margin = '0 auto';
      }
      
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(wrapper, {
        backgroundColor: `${StartHubColors.White1}`,
        useCORS: true,
        allowTaint: true,
        scale: 2,
        logging: false,
        width: wrapper.offsetWidth,
        height: wrapper.offsetHeight,
      });

      document.body.removeChild(wrapper);

      const link = document.createElement('a');
      const date = new Date().toISOString().split("T")[0];
      link.download = `BMC_${bmcData.title}_${date}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();

      toast.success("PDF 다운로드가 완료되었습니다!");
    } catch {
      toast.error("다운로드에 실패했습니다.");
    }
  }, []);

  return {
    canvasRef,
    hasAutoCaptureRef,
    captureBmcAndUpload,
    handleDownloadPDF,
  };
};