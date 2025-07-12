import * as S from "./style";
import { getCategoryInfo } from "@/shared/utils/Category/jobCategory";
import { ReactComponent as Electron } from "@assets/tag/electron.svg";
import { ReactComponent as Building } from "@assets/tag/building.svg";
import { ReactComponent as People } from "@assets/tag/people.svg";

interface HiringCardProps {
  companyName: string;
  companyDescription: string;
  companyCategory:
    | "CONTENT_MEDIA"
    | "FINTECH"
    | "HEALTHCARE_BIO"
    | "EDUCATION_EDUTECH"
    | "IT_SOFTWARE"
    | "ECOMMERCE"
    | "ETC";
}

const HiringCard = ({
  companyName,
  companyDescription,
  companyCategory,
}: HiringCardProps) => {
  const categoryInfo = getCategoryInfo(companyCategory);

  return (
    <S.CardContainer>
      <S.CategoryContainer $txColor={categoryInfo.txColor}>
          {categoryInfo.image}
        <span>{categoryInfo.text}</span>
      </S.CategoryContainer>
      <p>{companyDescription}</p>
      <span>{companyName} | 서울 강남구 · 경력 무관</span>
      <div style={{ display: "flex", marginTop: "8px" }}>
        <S.Tag>
          <Electron />
          적극 채용 중
        </S.Tag>
        <S.Tag>
          <Building />
          설립 1년
        </S.Tag>
        <S.Tag>
          <People />
          5명
        </S.Tag>
      </div>
    </S.CardContainer>
  );
};

export default HiringCard;
