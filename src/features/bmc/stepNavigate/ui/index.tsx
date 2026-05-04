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
      className="flex flex-col gap-5 bg-hub-white-2 overflow-auto h-[650px]"
    >
      {stepItems.map((step) => {
        const IconComponent = step.icon;
        const isCompleted = isStepCompleted(step.id);
        const isCurrent = isStepCurrent(step.id);

        return (
          <div key={step.id} className="flex gap-[25px] relative">
            <div
              className={`
                w-[50px] h-[50px] flex items-center justify-center rounded-lg
                ${isCurrent ? "bg-hub-primary text-hub-white-1" : ""}
                ${!isCurrent && isCompleted ? "bg-[#EAEAEA] text-hub-gray-2" : ""}
                ${!isCurrent && !isCompleted ? "bg-hub-white-1 text-hub-black-1" : ""}
              `}
            >
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 [&_*]:fill-current">
                  <IconComponent />
                </div>
              </div>
            </div>

            {isCurrent && step.description ? (
              <div className="flex flex-col gap-1 w-[340px] h-[90px] px-5 py-4 rounded-lg border-2 border-hub-primary bg-hub-white-1 font-pt-caption2-regular text-hub-black-1">
                <div className="font-ws-body3">{step.label}</div>
                <span className="text-hub-primary">{step.subLabel}</span>
                <div>{step.description}</div>
              </div>
            ) : (
              <div
                className={`
                  flex items-center w-[340px] h-[50px] pl-5 rounded-lg font-ws-body3
                  ${isCurrent ? "bg-hub-white-1 text-hub-black-1 border border-hub-primary" : ""}
                  ${!isCurrent && isCompleted ? "bg-[#EAEAEA] text-hub-gray-2" : ""}
                  ${!isCurrent && !isCompleted ? "bg-hub-white-1 text-hub-black-1" : ""}
                `}
              >
                {step.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BmcStepNavigate;