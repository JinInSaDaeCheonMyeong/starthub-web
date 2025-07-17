import * as S from "./style";
import { useState, useEffect } from "react";
import { StartHubSearchBar } from "@/shared/ui/SearchBar";
import { StartHubDropdown } from "@/shared/ui/DropDown";
import axios from "axios";
import { NoticeData } from "@/entities/notice/model/notice.type";

interface SearchNoticeProps {
  onFilteredNoticesChange: (notices: NoticeData[], total: number) => void;
  currentPage: number;
}

const SearchNotice = ({
  onFilteredNoticesChange,
  currentPage,
}: SearchNoticeProps) => {
  const [search, setSearch] = useState("");
  const [selectedSupport, setSelectedSupport] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [, setNotices] = useState<NoticeData[]>([]);
  const [, setTotalCount] = useState(0);
  /* eslint-disable @typescript-eslint/no-unused-vars */

  const fetchNotices = async () => {
    const params = {
      page: currentPage,
      perPage: 16,
      ...(search && { "cond[biz_pbanc_nm::LIKE]": search }),
      ...(selectedSupport && { "cond[supt_biz_clsfc::LIKE]": selectedSupport }),
      ...(selectedTarget && { "cond[aply_trgt::LIKE]": selectedTarget }),
      ...(selectedRegion && { "cond[supt_regin::LIKE]": selectedRegion }),
      ...(selectedAge && { "cond[biz_trgt_age::LIKE]": selectedAge }),
      ...(selectedExperience && { "cond[biz_enyy::LIKE]": selectedExperience }),
      returnType: "json",
    };

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NOTICE_API_URL}/v1/getAnnouncementInformation`,
        { params }
      );

      const fetchedNotices = response.data.data ?? [];
      const total = response.data.totalCount ?? 0;

      setNotices(fetchedNotices);
      setTotalCount(total);

      onFilteredNoticesChange(fetchedNotices, total);
    } catch (error) {
      console.error("Failed to fetch notices", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [
    search,
    selectedSupport,
    selectedTarget,
    selectedRegion,
    selectedAge,
    selectedExperience,
    currentPage,
  ]);

  const supportOptions = [
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
      label: "만 20세 ~ 39세 이하",
    },
    { value: "만 40세 이상", label: "만 40세 이상" },
  ];

  const experienceOptions = [
    { value: "예비창업자", label: "예비창업자" },
    { value: "1년미만", label: "1년미만" },
    { value: "2년미만", label: "2년미만" },
    { value: "3년미만", label: "3년미만" },
    { value: "5년미만", label: "5년미만" },
    { value: "7년미만", label: "7년미만" },
    { value: "10년미만", label: "10년미만" },
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
        />

        <StartHubDropdown
          options={targetOptions}
          value={selectedTarget}
          onChange={setSelectedTarget}
          placeholder="대상"
        />

        <StartHubDropdown
          options={regionOptions}
          value={selectedRegion}
          onChange={setSelectedRegion}
          placeholder="지역"
        />

        <StartHubDropdown
          options={ageOptions}
          value={selectedAge}
          onChange={setSelectedAge}
          placeholder="연령"
        />

        <StartHubDropdown
          options={experienceOptions}
          value={selectedExperience}
          onChange={setSelectedExperience}
          placeholder="창업 업력"
        />
      </S.DropdownContainer>
    </S.SearchNoticeContainer>
  );
};

export default SearchNotice;
