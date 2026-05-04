import { StartHubTextField } from "@/shared/ui";
import { useState, useEffect } from "react";
import { ReactComponent as Logo } from "@assets/logo/logo.svg";
import { useCreateSessions } from "@/entities/bmc/model/useCreateSessions";
import { BmcTemplateType } from "@/entities/bmc/model/types";

interface BusinessTemplateModalProps {
  isOpen: boolean;
  templateType: BmcTemplateType;
  onClose: () => void;
  onGenerateBmc: (projectName: string, templateType: BmcTemplateType) => void;
}

const BusinessTemplateModal = ({
  isOpen,
  templateType,
  onClose,
  onGenerateBmc,
}: BusinessTemplateModalProps) => {
  const [title, setTitle] = useState("");
  const { createSession } = useCreateSessions();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) setTitle(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && title.trim()) handleGenerate();
    if (event.key === "Escape") onClose();
  };

  const handleGenerate = () => {
    if (title.trim()) {
      onGenerateBmc(title, templateType);
      createSession({ title, templateType });
      setTitle("");
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${scrollbarWidth}px`,
      );

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.style.removeProperty("--scrollbar-width");
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-hub-white-1
          border border-hub-gray-3
          rounded-[10px]
          px-[75px] py-[51px]
          flex flex-col
          max-w-[90vw] max-h-[90vh]
        "
      >
        <div className="text-center mb-[10px] flex flex-col gap-[8px] items-center">
          <Logo className="w-[96px] h-[39px]" />
          <p className="font-pt-caption1-medium text-hub-black-1">
            {templateType} 템플릿으로 BMC를 생성합니다
          </p>
          <p className="font-pt-caption2-regular text-hub-gray-1">
            프로젝트 이름을 입력해주세요
          </p>
        </div>

        <StartHubTextField
          type="text"
          value={title}
          width={360}
          onChange={handleTitleChange}
          placeholder="20자 이내로 입력해주세요"
          onKeyDown={handleKeyDown}
        />

        <div className="flex gap-[12px] justify-center mt-[16px]">
          <button
            onClick={onClose}
            className="
              px-[24px] py-[12px]
              border border-hub-gray-3
              bg-hub-white-1
              text-hub-gray-1
              rounded-[8px]
              font-pt-body2-medium
              hover:bg-hub-gray-4
            "
          >
            취소
          </button>

          <button
            onClick={handleGenerate}
            disabled={!title.trim() || title.length > 20}
            className={`
              px-[24px] py-[12px]
              rounded-[8px]
              font-pt-body2-medium
              text-hub-white-1
              ${
                !title.trim() || title.length > 20
                  ? "bg-hub-gray-3 cursor-not-allowed"
                  : "bg-hub-primary cursor-pointer"
              }
            `}
          >
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessTemplateModal;
