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
    <div className="w-[250px] h-[150px] bg-hub-white-1 rounded-[14px] border-2 border-hub-gray-4 px-4 py-[25px] mr-auto">
      {/* 카테고리 */}
      <div className="flex items-center my-1 [&_svg]:w-[18px] [&_svg]:h-[18px] [&_svg]:mr-1">
        {categoryInfo.image}
        <span
          className="font-pt-caption2-regular"
          style={{ color: categoryInfo.txColor }}
        >
          {categoryInfo.text}
        </span>
      </div>

      {/* 회사 설명 */}
      <p className="font-pt-body1-semibold">{companyDescription}</p>

      {/* 회사명 · 위치 */}
      <span className="text-[#3e3e3e] font-pt-caption2-medium">
        {companyName} | 서울 강남구 · 경력 무관
      </span>

      {/* 태그 */}
      <div className="flex mt-2">
        {[
          { icon: <Electron />, label: "적극 채용 중" },
          { icon: <Building />, label: "설립 1년" },
          { icon: <People />, label: "5명" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center h-5 w-fit bg-hub-gray-4 font-pt-caption2-regular px-[6px] rounded mr-1"
          >
            {icon}
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiringCard;
