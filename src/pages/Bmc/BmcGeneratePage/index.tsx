import { BmcStepNavigate } from "@/features/bmc/stepNavigate/index";
import { BmcContent } from "@/widgets/bmc/BmcContent";
import * as S from "./style";
import { useBmcQuestions } from "@/entities/bmc/model/useBmcQuestions";
import useQuestionStore from "@/entities/bmc/model/useQuestionStore";
import { useEffect } from "react";
import Header from "@/widgets/Header";

const BmcGeneratePage = () => {
  const { bmcQuestions } = useBmcQuestions();
  const { isGeneratingBmc } = useQuestionStore();

  useEffect(() => {
    bmcQuestions();
  }, [bmcQuestions]);

  return (
    <S.Container>
      <Header />
      {isGeneratingBmc ? (
        <S.FullWidthWrapper>
          <BmcContent />
        </S.FullWidthWrapper>
      ) : (
        <S.Wrapper>
          <BmcStepNavigate />
          <BmcContent />
        </S.Wrapper>
      )}
    </S.Container>
  );
};

export default BmcGeneratePage;
