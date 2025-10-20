import * as S from "@/widgets/bmc/BmcCanvas/style";
import { BmcData } from "@/entities/bmc/model/types";

interface BmcLoadingStateProps {
  isLoading: boolean;
  bmcData: BmcData | null;
}

export const BmcLoadingState = ({ isLoading, bmcData }: BmcLoadingStateProps) => {
  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <S.LoadingText>BMC 데이터를 불러오는 중...</S.LoadingText>
        </S.LoadingContainer>
      </S.Container>
    );
  }

  if (!bmcData) {
    return (
      <S.Container>
        <S.ErrorContainer>
          <S.ErrorText>BMC 데이터를 찾을 수 없습니다.</S.ErrorText>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  return null;
};