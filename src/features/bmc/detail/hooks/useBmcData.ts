import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bmcApi } from '@/entities/bmc/api/bmc';
import { BmcData } from '@/entities/bmc/model/types';

export const useBmcData = () => {
  const { id } = useParams<{ id: string }>();
  const [bmcData, setBmcData] = useState<BmcData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBmcData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const response = await bmcApi.getCanvasesDetail(id);
        setBmcData(response.data);
      } catch (error) {
        console.error('BMC 데이터 로드 실패:', error);
        setBmcData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBmcData();
  }, [id]);

  return {
    bmcData,
    setBmcData,
    isLoading,
  };
};