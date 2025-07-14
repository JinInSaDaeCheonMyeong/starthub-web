import * as S from "./style";
import { useState } from "react";
import { StartHubSearchBar } from "@/shared/ui/SearchBar";
import { StartHubDropdown } from "@/shared/ui/DropDown";

const SearchNotice = () => {
  const [search, setSearch] = useState("");
  const [selectedSupport, setSelectedSupport] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const supportOptions = [
    { value: "사업화", label: "사업화" },
    { value: "R&D", label: "R&D" },
    { value: "인력양성", label: "인력양성" },
    { value: "멘토링", label: "멘토링" },
  ];

  const targetOptions = [
    { value: "청소년", label: "청소년" },
    { value: "대학생", label: "대학생" },
    { value: "일반인", label: "일반인" },
    { value: "대학", label: "대학" },
    { value: "연구기관", label: "연구기관" },
    { value: "일반기업", label: "일반기업" },
    { value: "1인 창조기업", label: "1인 창조기업" },
  ];

  const regionOptions = [
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
    { value: "충북", label: "충북" },
    { value: "충남", label: "충남" },
    { value: "전북", label: "전북" },
    { value: "전남", label: "전남" },
    { value: "경북", label: "경북" },
    { value: "경남", label: "경남" },
    { value: "제주", label: "제주" },
  ];

  const ageOptions = [
    { value: "만 20세 미만", label: "만 20세 미만" },
    {
      value: "만 20세 이상 ~ 만 39세 이하",
      label: "만 20세 이상 ~ 만 39세 이하",
    },
    { value: "만 40세 이상", label: "만 40세 이상" },
  ];

  const experienceOptions = [
    { value: "1년미만", label: "1년미만" },
    { value: "2년미만", label: "2년미만" },
    { value: "3년미만", label: "3년미만" },
    { value: "5년미만", label: "5년미만" },
    { value: "5년이상", label: "5년이상" },
  ];

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };


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
          options={supportOptions}
          value={selectedSupport}
          onChange={setSelectedSupport}
          placeholder="지원분야"
          customStyle={{ width: "fit-content", minWidth: "120px" }}
        />

        <StartHubDropdown
          options={targetOptions}
          value={selectedTarget}
          onChange={setSelectedTarget}
          placeholder="대상"
          customStyle={{ width: "fit-content", minWidth: "120px" }}
        />

        <StartHubDropdown
          options={regionOptions}
          value={selectedRegion}
          onChange={setSelectedRegion}
          placeholder="지역"
          customStyle={{ width: "fit-content", minWidth: "120px" }}
        />

        <StartHubDropdown
          options={ageOptions}
          value={selectedAge}
          onChange={setSelectedAge}
          placeholder="연령"
          customStyle={{ width: "fit-content", minWidth: "120px" }}
        />

        <StartHubDropdown
          options={experienceOptions}
          value={selectedExperience}
          onChange={setSelectedExperience}
          placeholder="창업 업력"
          customStyle={{ width: "fit-content", minWidth: "120px" }}
        />
      </S.DropdownContainer>
    </S.SearchNoticeContainer>
  );
};

export default SearchNotice;
