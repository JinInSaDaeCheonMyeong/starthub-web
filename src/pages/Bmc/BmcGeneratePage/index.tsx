import { BmcStepNavigate } from "@/features/bmc/stepNavigate/index";
import { BmcContent } from "@/widgets/bmc/BmcContent";
import { BmcHeader } from "@/widgets/bmc/BmcHeader";
import * as S from './style';

const BmcGeneratePage = () => {

  return (
    <S.Container>
      <BmcHeader/>
      <S.Wrapper>
        <BmcStepNavigate />
        <BmcContent />
      </S.Wrapper>
    </S.Container>
  );
};

export default BmcGeneratePage;
