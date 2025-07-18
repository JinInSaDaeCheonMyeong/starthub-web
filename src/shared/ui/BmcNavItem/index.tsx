import BmcIcon from "@/shared/ui/BmcIcon";
import { BmcSectionInfo } from "@/entities/bmcSection/model/types";
import { Container, IconWrapper, TextGroup, CompletedBadge } from "./style";

interface Props extends BmcSectionInfo {
  isActive: boolean;
  isCompleted: boolean;
}

export const BmcNavItem = ({
  icon,
  title,
  step,
  description,
  isActive,
  isCompleted,
}: Props) => {
  return (
    <Container $active={isActive} $completed={isCompleted}>
      <IconWrapper>
        <BmcIcon 
          name={icon} 
          isActive={isActive} 
          isCompleted={isCompleted}
        />
      </IconWrapper>
      <TextGroup>
        <p className="step">{step}</p>
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
      </TextGroup>

      {isCompleted && <CompletedBadge>✔</CompletedBadge>}
    </Container>
  );
};