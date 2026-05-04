import { JOB_CATEGORY } from "@/shared/utils/Category/jobCategory";

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
}

const CategorySelector = ({
  selectedCategories,
  onCategoryToggle,
}: CategorySelectorProps) => {
  return (
    // Section
    <div className="mb-8">
      {/* SectionTitle */}
      <p className="font-pt-body2-medium text-hub-black-1 mb-2.5">
        창업 분야(1개 이상) <span className="text-hub-primary text-sm">*</span>
      </p>

      {/* SectionDescription */}
      <p className="font-pt-caption2-regular text-hub-primary mb-4">
        창업 분야를 알려주시면, 맞춤형 콘텐츠를 추천해드려요!
      </p>

      {/* CategoryGrid */}
      <div className="flex flex-wrap gap-3 mb-4">
        {JOB_CATEGORY.map((category) => {
          const isActive = selectedCategories.includes(category.enum);
          return (
            // CategoryButton
            <button
              key={category.enum}
              onClick={() => onCategoryToggle(category.enum)}
              className="inline-flex items-center gap-2 py-2 px-3 w-fit rounded-[10px] font-pt-caption2-regular cursor-pointer transition-all duration-200"
              style={{
                border: `1px solid ${category.txColor}`,
                backgroundColor: isActive ? `${category.txColor}30` : "#FFFFFF",
                color: category.txColor,
              }}
            >
              {/* CategoryContainer */}
              <div className="flex items-center gap-2 [&_svg]:w-[18px] [&_svg]:h-[18px]">
                {category.image}
                <span
                  className="text-xs font-medium text-center leading-[1.2]"
                  style={{ color: category.txColor }}
                >
                  {category.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
