import { BmcStepNavigate } from "@/features/bmc/stepNavigate/index";
import { BmcContent } from "@/widgets/bmc/BmcContent";
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
    <div className="h-screen flex flex-col bg-hub-white-2 overflow-hidden">
      <Header />
      {isGeneratingBmc ? (
        <div className="mt-[110.8px] flex bg-hub-white-2 w-full h-[calc(100vh-110.8px)] overflow-auto">
          <BmcContent />
        </div>
      ) : (
        <div className="m-auto mt-[110.8px] flex bg-hub-white-2 gap-[55px] p-[34px_0] justify-center w-full h-[calc(100vh-78px)] overflow-auto">
          <BmcStepNavigate />
          <BmcContent />
        </div>
      )}
    </div>
  );
};

export default BmcGeneratePage;
