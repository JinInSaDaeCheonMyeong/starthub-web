import * as S from "./style";
import { JOB_CATEGORY } from "@/shared/utils/Category/jobCategory";

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
}

const CategorySelector = ({ selectedCategories, onCategoryToggle }: CategorySelectorProps) => {
  const handleCategoryClick = (categoryEnum: string) => {
    onCategoryToggle(categoryEnum);
  };

  return (
    <S.Section>
      <S.SectionTitle>창업 분야(1개 이상) <span>*</span></S.SectionTitle>
      <S.SectionDescription>
        관심 분야를 알려주시면, 맞춤형 콘텐츠를 추천해드려요!
      </S.SectionDescription>

      <S.CategoryGrid>
        {JOB_CATEGORY.map((category) => (
          <S.CategoryButton
            key={category.enum}
            $customColor={category.txColor}
            $active={selectedCategories.includes(category.enum)}
            onClick={() => handleCategoryClick(category.enum)}
          >
            <S.CategoryContainer $txColor={category.txColor}>
              {category.image}
              <span>{category.text}</span>
            </S.CategoryContainer>
          </S.CategoryButton>
        ))}
      </S.CategoryGrid>
    </S.Section>
  );
};

export default CategorySelector;