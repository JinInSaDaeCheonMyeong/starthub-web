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
    <>
      <div
        onClick={() => router.push(path)}
        className="flex items-center mb-5 cursor-pointer font-pt-h2-semibold"
      >
        <p className="mr-[10px]">{title}</p>
        <Arrow className="w-[15px]" />
      </div>
      {children}
    </>
  );
};

export default SectionBlock;
