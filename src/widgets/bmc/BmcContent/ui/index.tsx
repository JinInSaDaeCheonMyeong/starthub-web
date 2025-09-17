import { useBmcStore } from "@/entities/bmc/model/useBmcStore";
import BmcStepForm from "@/features/bmc/stepForm/ui";

const BmcContent = () => {
  const { currentStep } = useBmcStore();

  const stepConfig = {
    "business-idea": {
      title: "Business Idea",
      description: "제품이나 서비스를 간단하게 설명해주세요.",
    },
    "customer-segments": {
      title: "Customer Segments",
      description: "핵심 고객은 누구인가요?",
    },
    "value-proposition": {
      title: "Value Proposition",
      description: "고객에게 제공할 주요 가치와 해결책은 무엇인가요?",
    },
    channels: {
      title: "Channels",
      description: "고객은 어떤 경로를 통해 우리 제품을 만나고 사용하는가요?",
    },
    "customer-relationships": {
      title: "Customer Relationships",
      description: "고객과 어떤 관계를 유지할 계획인가요?",
    },
    "revenue-streams": {
      title: "Revenue Streams",
      description: "고객은 언제, 무엇에 대해 비용을 지불하나요?",
    },
    "key-resources": {
      title: "Key Resources",
      description: "꼭 필요한 핵심 자원은 무엇인가요?",
    },
    "key-activities": {
      title: "Key Activities",
      description: "이 가치를 만들기 위한 핵심 활동은 무엇인가요?",
    },
    "key-partnerships": {
      title: "Key Partnerships",
      description: "함께해야 할 핵심 파트너는 누구인가요?",
    },
    "cost-structure": {
      title: "Cost Structure",
      description: "이 서비스를 운영하는 데 어떤 비용이 드나요?",
    },
  };

  const config = stepConfig[currentStep] || stepConfig["customer-segments"];

  return (
    <BmcStepForm
      key={currentStep}
      stepId={currentStep}
      title={config.title}
      description={config.description}
      placeholder={"이 항목에 대한 내용을 자유롭게 입력해주세요."}
    />
  );
};

export default BmcContent;
