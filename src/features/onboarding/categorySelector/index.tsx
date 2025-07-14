import * as S from "./style";
import { JOB_CATEGORY } from "@/shared/utils/Category/jobCategory";
import { useState } from "react";

const CategorySelector = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (categoryEnum: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryEnum)) {
        return prevSelected.filter((item) => item !== categoryEnum);
      }
      return [...prevSelected, categoryEnum];
    });
  };

  return (
    <S.Section>
      <S.SectionTitle>관심 분야(1개 이상)</S.SectionTitle>
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
            <S.CategoryIcon src={category.image} alt={category.text} />
            <S.CategoryText $txColor={category.txColor}>
              {category.text}
            </S.CategoryText>
          </S.CategoryButton>
        ))}
      </S.CategoryGrid>
    </S.Section>
  );
};

export default CategorySelector;