import React from "react";

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  message = "로딩 중입니다...",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
      <div className="bg-white px-[60px] py-[40px] rounded-xl flex flex-col items-center gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <div className="w-[50px] h-[50px] rounded-full border-4 border-[#f3f3f3] border-t-[#3498db] animate-spin" />
        <p className="text-base text-[#333] text-center leading-relaxed whitespace-pre-line m-0">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
