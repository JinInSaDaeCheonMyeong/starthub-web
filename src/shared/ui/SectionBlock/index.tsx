import styled from "styled-components";
import { StartHubFont } from "@/shared/design";
import { ReactComponent as Arrow } from "@assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";

interface SectionBlockProps {
  title: string;
  children: React.ReactNode;
  path: string;
}

const SectionBlock = ({ title, children, path }: SectionBlockProps) => {
  const navigate = useNavigate();

  return (
    <>
      <LabelSection onClick={() => navigate(path)}>
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
  p {
    margin-right: 10px;
  }

  svg {
    width: 15px;
  }
`;
