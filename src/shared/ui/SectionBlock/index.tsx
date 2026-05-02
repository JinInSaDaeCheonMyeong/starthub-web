'use client'

import styled from "styled-components";
import { StartHubFont } from "@/shared/design";
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
      <LabelSection onClick={() => router.push(path)}>
        <p>{title}</p>
        <Arrow />
      </LabelSection>
      {children}
    </>
  );
};

export default SectionBlock;

export const LabelSection = styled.div`
  ${StartHubFont.Pretendard.Headlines2.SemiBold}
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  p {
    margin-right: 10px;
  }

  svg {
    width: 15px;
  }
`;
