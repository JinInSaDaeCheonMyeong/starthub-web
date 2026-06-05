import { useEffect, useState } from "react";
import { LOCATIONS } from "@/shared/constants/locations.constant";

interface LocationSelectorProps {
  onChange: (location: string) => void;
}

const LocationSelector = ({ onChange }: LocationSelectorProps) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    if (selectedCity && selectedDistrict) {
      onChange(`${selectedCity} ${selectedDistrict}`);
    }
  }, [selectedCity, selectedDistrict]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict("");
  };

  return (
    <div className="flex gap-[10px]">
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
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="#CFCFCF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="relative flex-1">
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedCity}
          className="w-full h-[50px] px-5 border border-hub-gray-3 rounded-[10px] font-pt-caption1-regular bg-white text-hub-black-1 focus:outline-none focus:border-hub-primary appearance-none cursor-pointer hover:border-hub-gray-2 transition-colors pr-8 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <option value="">구/군 선택</option>
          {selectedCity &&
            LOCATIONS[selectedCity as keyof typeof LOCATIONS]?.map(
              (district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ),
            )}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="#CFCFCF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
