import { StartHubTextField } from "@/shared/ui";
import { useState, useEffect } from "react";

// 시/도 및 구/군 데이터
const LOCATIONS = {
  "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
  "부산광역시": ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
  "대구광역시": ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
  "인천광역시": ["강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "옹진군", "중구"],
  "광주광역시": ["광산구", "남구", "동구", "북구", "서구"],
  "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
  "울산광역시": ["남구", "동구", "북구", "울주군", "중구"],
  "세종특별자치시": ["세종시"],
  "경기도": ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
};

interface EarlyOnboardingData {
  companyName: string;
  companyDescription: string;
  numberOfEmployees: number;
  companyWebsite: string;
  startupLocation: string;
  annualRevenue: number;
}

interface EarlyOnboardingProps {
  onSubmit?: (data: EarlyOnboardingData) => void;
}

const EarlyOnboarding = ({ onSubmit }: EarlyOnboardingProps) => {
  const [formData, setFormData] = useState<EarlyOnboardingData>({
    companyName: "",
    companyDescription: "",
    numberOfEmployees: 0,
    companyWebsite: "",
    startupLocation: "",
    annualRevenue: 0,
  });

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  useEffect(() => {
    onSubmit?.(formData);
  }, [formData]);

  // 시/도 변경 시 구/군 초기화 및 전체 주소 업데이트
  useEffect(() => {
    if (selectedCity && selectedDistrict && selectedCity.trim() !== "" && selectedDistrict.trim() !== "") {
      setFormData(prev => ({
        ...prev,
        startupLocation: `${selectedCity} ${selectedDistrict}`
      }));
    }
  }, [selectedCity, selectedDistrict]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(""); // 시/도 변경 시 구/군 초기화
  };

  const titleClass = "font-pt-body2-medium text-hub-black-1";
  const requiredClass = "text-hub-primary";

  return (
    <div className="flex flex-col gap-5">
      {/* 회사명 */}
      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>
          회사명 <span className={requiredClass}>*</span>
        </p>
        <StartHubTextField
          type="text"
          value={formData.companyName}
          placeholder="회사명을 입력해주세요"
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          width={340}
          className="h-[50px]"
          autoComplete="organization"
        />
      </div>

      {/* 기업 설명 */}
      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>
          기업 설명 <span className={requiredClass}>*</span>
        </p>
        <StartHubTextField
          type="text"
          value={formData.companyDescription}
          placeholder="기업을 설명해주세요"
          onChange={(e) =>
            setFormData({ ...formData, companyDescription: e.target.value })
          }
          width={340}
          className="h-[50px]"
        />
      </div>

      {/* 기업 인원 */}
      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>
          기업 인원 <span className={requiredClass}>*</span>
        </p>
        <div className="relative w-full">
          <StartHubTextField
            type="number"
            value={
              formData.numberOfEmployees === 0
                ? ""
                : String(formData.numberOfEmployees)
            }
            placeholder="기업 인원을 입력해주세요"
            onChange={(e) => {
              const value = e.target.value === "" ? 0 : Number(e.target.value);
              setFormData({
                ...formData,
                numberOfEmployees: value < 0 ? 0 : value,
              });
            }}
            width={340}
            className="h-[50px] pr-8"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#CFCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 기업 사이트 */}
      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>기업 사이트</p>
        <StartHubTextField
          type="text"
          value={formData.companyWebsite}
          placeholder="기업 사이트 주소를 입력해주세요"
          onChange={(e) =>
            setFormData({ ...formData, companyWebsite: e.target.value })
          }
          width={340}
          className="h-[50px]"
          autoComplete="url"
        />
      </div>

      {/* 창업 위치 */}
      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>
          창업 위치 <span className={requiredClass}>*</span>
        </p>
        <div className="flex gap-[10px]">
          {/* 시/도 선택 */}
          <div className="relative flex-1">
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full h-[50px] px-5 border border-hub-gray-3 rounded-[10px] font-pt-caption1-regular bg-white text-hub-black-1 focus:outline-none focus:border-hub-primary appearance-none cursor-pointer hover:border-hub-gray-2 transition-colors pr-8"
            >
              <option value="">시/도 선택</option>
              {Object.keys(LOCATIONS).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#CFCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* 구/군 선택 */}
          <div className="relative flex-1">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedCity}
              className="w-full h-[50px] px-5 border border-hub-gray-3 rounded-[10px] font-pt-caption1-regular bg-white text-hub-black-1 focus:outline-none focus:border-hub-primary appearance-none cursor-pointer hover:border-hub-gray-2 transition-colors pr-8 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="">구/군 선택</option>
              {selectedCity && LOCATIONS[selectedCity as keyof typeof LOCATIONS]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#CFCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 연매출액 */}
      <div className="flex flex-col gap-[10px]">
        <p className={titleClass}>연매출액</p>
        <div className="relative w-full">
          <select
            value={formData.annualRevenue}
            onChange={(e) => setFormData({ ...formData, annualRevenue: Number(e.target.value) })}
            className="w-full h-[50px] px-5 border border-hub-gray-3 rounded-[10px] font-pt-caption1-regular bg-white text-hub-black-1 focus:outline-none focus:border-hub-primary appearance-none cursor-pointer hover:border-hub-gray-2 transition-colors pr-8"
          >
            <option value={0}>연매출액을 선택해주세요</option>
            <option value={10000000}>1천만원 미만</option>
            <option value={50000000}>1천만원 - 5천만원</option>
            <option value={100000000}>5천만원 - 1억원</option>
            <option value={500000000}>1억원 - 5억원</option>
            <option value={1000000000}>5억원 - 10억원</option>
            <option value={5000000000}>10억원 - 50억원</option>
            <option value={10000000000}>50억원 이상</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#CFCFCF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EarlyOnboarding as default, type EarlyOnboardingProps };
