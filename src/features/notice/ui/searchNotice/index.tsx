import * as S from "./style";
import { useState, useEffect } from "react";
import { StartHubSearchBar } from "@/shared/ui/SearchBar";
import { StartHubDropdown } from "@/shared/ui/DropDown";
import { NoticeSearchParams } from "@/entities/notice/model/notice.type";

interface SearchNoticeProps {
  onFilterChange: (filters: Omit<NoticeSearchParams, "page" | "size">) => void;
}

const SearchNotice = ({ onFilterChange }: SearchNoticeProps) => {
  const [search, setSearch] = useState("");
  const [selectedSupport, setSelectedSupport] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const updateFilters = () => {
    onFilterChange({
      title: search || undefined,
      supportField: selectedSupport || undefined,
      targetGroup: selectedTarget || undefined,
      targetRegion: selectedRegion || undefined,
      targetAge: selectedAge || undefined,
      businessExperience: selectedExperience || undefined,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    updateFilters();
  }, [
    search,
    selectedSupport,
    selectedTarget,
    selectedRegion,
    selectedAge,
    selectedExperience,
  ]);

  return (
    <S.SearchNoticeContainer>
      <h1>공고 찾기</h1>

      <StartHubSearchBar
        value={search}
        onChange={handleSearchChange}
        customStyle={{ width: "552px" }}
        placeholder="찾을 공고를 입력해주세요!"
      />

      <S.DropdownContainer>
        <StartHubDropdown
          options={[
            { value: "", label: "지원분야" }, 
            { value: "사업화", label: "사업화" },
            { value: "기술개발", label: "R&D" },
            { value: "시설", label: "시설" },
            { value: "멘토링", label: "멘토링" },
            { value: "글로벌", label: "글로벌" },
            { value: "인력", label: "인력" },
            { value: "융자", label: "융자" },
            { value: "행사", label: "행사" },
            { value: "창업교육", label: "창업교육" },
            { value: "해외진출", label: "해외진출" },
            { value: "정책자금", label: "정책자금" },
          ]}
          value={selectedSupport}
          onChange={setSelectedSupport}
          placeholder="지원분야"
        />

        <StartHubDropdown
          options={[
            { value: "", label: "대상" },
            { value: "청소년", label: "청소년" },
            { value: "대학생", label: "대학생" },
            { value: "일반인", label: "일반인" },
            { value: "대학", label: "대학" },
            { value: "연구기관", label: "연구기관" },
            { value: "일반기업", label: "일반기업" },
            { value: "1인 창조기업", label: "1인 창조기업" },
          ]}
          value={selectedTarget}
          onChange={setSelectedTarget}
          placeholder="대상"
        />

        <StartHubDropdown
          options={[
            { value: "", label: "지역" },
            { value: "전국", label: "전국" },
            { value: "서울", label: "서울" },
            { value: "부산", label: "부산" },
            { value: "대구", label: "대구" },
            { value: "인천", label: "인천" },
            { value: "광주", label: "광주" },
            { value: "대전", label: "대전" },
            { value: "울산", label: "울산" },
            { value: "세종", label: "세종" },
            { value: "경기", label: "경기" },
            { value: "강원", label: "강원" },
            { value: "충청북도", label: "충북" },
            { value: "충청남도", label: "충남" },
            { value: "전라북도", label: "전북" },
            { value: "전라남도", label: "전남" },
            { value: "경상북도", label: "경북" },
            { value: "경상남도", label: "경남" },
            { value: "제주", label: "제주" },
          ]}
          value={selectedRegion}
          onChange={setSelectedRegion}
          placeholder="지역"
        />

        <StartHubDropdown
          options={[
            { value: "", label: "연령" }, 
            { value: "만 20세 미만", label: "만 20세 미만" },
            {
              value: "만 20세 이상 ~ 만 39세 이하",
              label: "만 20세 ~ 39세 이하",
            },
            { value: "만 40세 이상", label: "만 40세 이상" },
          ]}
          value={selectedAge}
          onChange={setSelectedAge}
          placeholder="연령"
        />

        <StartHubDropdown
          options={[
            { value: "", label: "창업 업력" },
            { value: "예비창업자", label: "예비창업자" },
            { value: "1년미만", label: "1년미만" },
            { value: "2년미만", label: "2년미만" },
            { value: "3년미만", label: "3년미만" },
            { value: "5년미만", label: "5년미만" },
            { value: "7년미만", label: "7년미만" },
            { value: "10년미만", label: "10년미만" },
          ]}
          value={selectedExperience}
          onChange={setSelectedExperience}
          placeholder="창업 업력"
        />
      </S.DropdownContainer>
    </S.SearchNoticeContainer>
  );
};

export default SearchNotice;
