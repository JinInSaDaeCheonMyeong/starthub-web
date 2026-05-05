import { useEffect, useRef } from "react";
import * as I from "@/assets/icons/bmc/index";
import { useBmcStore } from "@/entities/bmc/model/useBmcStore";
import { StepItem } from "../model/types";

const stepItems: StepItem[] = [
  {
    id: "business-idea",
    icon: I.BusinessIdea,
    label: "Business Idea",
    subLabel: "비즈니스 아이디어",
    description: "제품이나 서비스를 간단하게 설명해주세요.",
  },
  {
    id: "customer-segments",
    icon: I.CustomerSegments,
    label: "Customer Segments",
    subLabel: "고객 세그먼트",
    description: "문제를 겪는 주요 고객층의 특성과 상황을 파악합니다.",
  },
  {
    id: "value-proposition",
    icon: I.ValueProposition,
    label: "Value Proposition",
    subLabel: "가치 제안",
    description: "제품이나 서비스가 고객에게 제공할 핵심 가치를 도출합니다.",
  },
  {
    id: "channels",
    icon: I.Channels,
    label: "Channels",
    subLabel: "채널",
    description: "고객에게 가치를 전달할 주요 채널과 경로를 정합니다.",
  },
  {
    id: "customer-relationships",
    icon: I.CustomerRelationships,
    label: "Customer Relationships",
    subLabel: "고객 관계",
    description: "고객과의 관계를 형성하고 유지하는 전략을 수립합니다.",
  },
  {
    id: "revenue-streams",
    icon: I.RevenueStreams,
    label: "Revenue Streams",
    subLabel: "수익 흐름",
    description: "수익을 창출할 구체적인 방법과 모델을 설계합니다.",
  },
  {
    id: "key-resources",
    icon: I.KeyResources,
    label: "Key Resources",
    subLabel: "핵심 자원",
    description: "사업 운영에 필요한 핵심 자원들을 식별합니다.",
  },
  {
    id: "key-activities",
    icon: I.KeyActivities,
    label: "Key Activities",
    subLabel: "핵심 활동",
    description: "사업 성공을 위해 반드시 수행해야 할 핵심 활동을 도출합니다.",
  },
  {
    id: "key-partnerships",
    icon: I.KeyPartnerships,
    label: "Key Partnerships",
    subLabel: "핵심 파트너",
    description: "필요한 외부 파트너 및 협력 관계를 설정합니다.",
  },
  {
    id: "cost-structure",
    icon: I.CostStructure,
    label: "Cost Structure",
    subLabel: "비용",
    description: "사업 운영에 들어가는 주요 비용 구조를 정리합니다.",
  },
];
const BmcStepNavigate = () => {
  const { isStepCompleted, isStepCurrent, currentStep } = useBmcStore();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentStep === "cost-structure" && wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [currentStep]);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col gap-3 sm:gap-4 lg:gap-5 bg-hub-white-1 overflow-auto h-[400px] sm:h-[500px] lg:h-[650px] px-2 sm:px-0"
    >
      {stepItems.map((step) => {
        const IconComponent = step.icon;
        const isCompleted = isStepCompleted(step.id);
        const isCurrent = isStepCurrent(step.id);

        return (
          <div key={step.id} className="flex gap-3 sm:gap-4 lg:gap-[25px] relative">
            <div
              className={`
                w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] lg:h-[50px] flex items-center justify-center rounded-[10px] flex-shrink-0
                ${isCurrent ? "bg-hub-primary" : ""}
                ${!isCurrent && isCompleted ? "bg-[#EAEAEA]" : ""}
                ${!isCurrent && !isCompleted ? "bg-hub-white-1 border border-hub-gray-3" : ""}
              `}
            >
              <IconComponent className={`
                w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6
                [&_*]:fill-current
                ${isCurrent ? "text-hub-white-1" : ""}
                ${!isCurrent && isCompleted ? "text-hub-gray-2" : ""}
                ${!isCurrent && !isCompleted ? "text-hub-black-1" : ""}
              `} />
            </div>

            {isCurrent && step.description ? (
              <div className="flex flex-col gap-1 w-full max-w-[280px] sm:max-w-[320px] lg:w-[340px] min-h-[70px] sm:min-h-[80px] lg:h-[90px] px-3 sm:px-4 lg:px-5 py-3 sm:py-3 lg:py-4 rounded-[10px] border-2 border-hub-primary bg-hub-white-1 text-hub-black-1">
                <div className="font-ws-body3 text-sm sm:text-base">{step.label}</div>
                <span className="text-hub-primary text-sm font-pt-caption2-regular">{step.subLabel}</span>
                <div className="text-xs sm:text-sm font-pt-caption2-regular">{step.description}</div>
              </div>
            ) : (
              <div
                className={`
                  flex items-center w-full max-w-[280px] sm:max-w-[320px] lg:w-[340px] h-10 sm:h-12 lg:h-[50px] pl-3 sm:pl-4 lg:pl-5 rounded-[10px] font-ws-body3 text-sm sm:text-base
                  ${isCurrent ? "bg-hub-white-1 text-hub-black-1 border border-hub-primary" : ""}
                  ${!isCurrent && isCompleted ? "bg-[#EAEAEA] text-hub-gray-2" : ""}
                  ${!isCurrent && !isCompleted ? "bg-hub-white-1 text-hub-black-1 border border-hub-gray-3" : ""}
                `}
              >
                <span className="block lg:hidden">{step.subLabel}</span>
                <span className="hidden lg:block">{step.label}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BmcStepNavigate;