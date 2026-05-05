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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-hub-white-1
          border border-hub-gray-3
          rounded-[10px]
          px-6 py-8 sm:px-12 lg:px-[75px] sm:py-10 lg:py-[51px]
          flex flex-col
          w-full max-w-[480px] sm:max-w-[520px]
          max-h-[90vh]
        "
      >
        <div className="text-center mb-6 lg:mb-[10px] flex flex-col gap-2 lg:gap-[8px] items-center">
          <Logo className="w-20 h-8 sm:w-[96px] sm:h-[39px]" />
          <p className="font-pt-caption1-medium text-hub-black-1 text-sm sm:text-base">
            {templateType} 템플릿으로 BMC를 생성합니다
          </p>
          <p className="font-pt-caption2-regular text-hub-gray-1 text-sm">
            프로젝트 이름을 입력해주세요
          </p>
        </div>

        <div className="w-full mb-4 lg:mb-0">
          <StartHubTextField
            type="text"
            value={title}
            width="100%"
            onChange={handleTitleChange}
            placeholder="20자 이내로 입력해주세요"
            onKeyDown={handleKeyDown}
            className="w-full"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-[12px] justify-center mt-4 sm:mt-[16px]">
          <button
            onClick={onClose}
            className="
              w-full sm:w-auto
              px-6 py-3 sm:px-[24px] sm:py-[12px]
              border border-hub-gray-3
              bg-hub-white-1
              text-hub-gray-1
              rounded-[8px]
              font-pt-body2-medium
              hover:bg-hub-gray-4
              transition-colors
            "
          >
            취소
          </button>

          <button
            onClick={handleGenerate}
            disabled={!title.trim() || title.length > 20}
            className="
              w-full sm:w-auto
              px-6 py-3 sm:px-[24px] sm:py-[12px]
              rounded-[8px]
              font-pt-body2-medium
              transition-colors
              disabled:cursor-not-allowed
            "
            style={{
              backgroundColor: (!title.trim() || title.length > 20) ? '#D9D9D9' : '#007AFF',
              color: (!title.trim() || title.length > 20) ? '#999999' : '#FFFFFF',
              cursor: (!title.trim() || title.length > 20) ? 'not-allowed' : 'pointer'
            }}
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessTemplateModal;
