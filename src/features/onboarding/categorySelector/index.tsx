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
    <div className="flex flex-col gap-[10px]">
      {/* Section Title and Description */}
      <div className="flex flex-col">
        <p className="font-pt-body2-medium text-hub-black-1">
          창업 분야(1개 이상) <span className="text-hub-primary">*</span>
        </p>
        <p className="font-pt-caption2-regular text-hub-primary mt-1">
          창업 분야를 알려주시면, 맞춤형 공고를 추천해드릴게요!
        </p>
      </div>

      {/* Category Grid */}
      <div className="flex flex-wrap gap-[10px]">
        {JOB_CATEGORY.map((category) => {
          const isActive = selectedCategories.includes(category.enum);
          return (
            <button
              key={category.enum}
              onClick={() => onCategoryToggle(category.enum)}
              className="flex items-center gap-[6px] px-3 py-2 rounded-[10px] font-pt-caption2-regular cursor-pointer transition-all duration-200"
              style={{
                border: `1px solid ${category.txColor}`,
                backgroundColor: isActive ? `${category.txColor}1A` : "#FFFFFF",
                color: category.txColor,
              }}
            >
              <div className="flex items-center gap-[6px]">
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  {category.image}
                </div>
                <span className="text-[12px] font-pt-caption2-regular whitespace-nowrap">
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
