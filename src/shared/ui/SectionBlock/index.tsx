import styled from "styled-components";
import { StartHubFont } from "@/shared/design";
import { ReactComponent as Arrow } from "@assets/icons/arrow.svg";

const SectionBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <LabelSection>
      <p>{title}</p>
      <Arrow />
    </LabelSection>
    {children}
  </>
);

export default SectionBlock;

export const LabelSection = styled.div`
  ${StartHubFont.Pretendard.Body1.Medium}
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    margin-right: 10px;
  }
`;
