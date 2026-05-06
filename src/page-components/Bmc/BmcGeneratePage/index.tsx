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
    <div className="min-h-screen bg-hub-white-2">
      <Header />
      <div className="lg:pt-[120px] lg:min-h-[calc(100vh-120px)] bg-hub-white-1">
        {isGeneratingBmc ? (
          <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-6">
            <BmcContent />
          </div>
        ) : (
          <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-[34px] w-full">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-[55px] w-auto">
              <div className="hidden lg:flex lg:w-auto">
                <BmcStepNavigate />
              </div>
              <div className="flex w-full lg:w-auto">
                <BmcContent />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BmcGeneratePage;
