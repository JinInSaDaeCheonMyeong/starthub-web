"use client";

import { ReactComponent as Arrow } from "@assets/icons/arrow.svg";
import { useRouter } from "next/navigation";

interface SectionBlockProps {
  title: string;
  children: React.ReactNode;
  path: string;
}

const SectionBlock = ({ title, children, path }: SectionBlockProps) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div
        onClick={() => router.push(path)}
        className="flex items-center mb-5 cursor-pointer font-pt-h2-semibold text-[20px] text-hub-gray-1"
      >
        <span className="mr-[5px] break-keep">{title}</span>
        <Arrow className="w-[15px] h-[15px]" />
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default SectionBlock;
