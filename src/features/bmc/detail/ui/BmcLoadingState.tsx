import { BmcData } from "@/entities/bmc/model/types";

interface BmcLoadingStateProps {
  isLoading: boolean;
  bmcData: BmcData | null;
}

export const BmcLoadingState = ({
  isLoading,
  bmcData,
}: BmcLoadingStateProps) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[20px]">
          <div className="text-[18px] text-hub-gray-2 font-pt-body1-regular">
            BMC 데이터를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (!bmcData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[24px]">
          <div className="text-[20px] text-hub-error font-pt-body1-medium">
            BMC 데이터를 찾을 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return null;
};
