import { ReactComponent as Funds } from "@assets/category/fund.svg";
import { ReactComponent as Facility } from "@assets/category/facility.svg";
import { ReactComponent as Schooling } from "@assets/category/schooling.svg";
import { ReactComponent as Light } from "@assets/category/light.svg";
import { ReactComponent as Calender } from "@assets/category/calender.svg";
import { ReactComponent as Global } from "@assets/category/global.svg";
import { ReactComponent as Commercial } from "@assets/category/commercialization.svg";
import { ReactComponent as Manpower } from "@assets/category/manpower.svg";

const NOTICE_CATEGORY = [
  {
    text: "자금",
    enum: "자금",
    icon: <Funds />,
  },
  {
    text: "자금",
    enum: "정책자금",
    icon: <Funds />,
  },
  {
    text: "시설",
    enum: "시설ㆍ공간ㆍ보육",
    icon: <Facility />,
  },
  {
    text: "교육",
    enum: "창업교육",
    icon: <Schooling />,
  },
  {
    text: "교육",
    enum: "멘토링ㆍ컨설팅ㆍ교육",
    icon: <Schooling />,
  },
  {
    text: "R&D",
    enum: "기술개발(R&amp;D)",
    icon: <Light />,
  },
  {
    text: "행사",
    enum: "행사ㆍ네트워크",
    icon: <Calender />,
  },
  {
    text: "글로벌",
    enum: "글로벌",
    icon: <Global />,
  },
  {
    text: "사업화",
    enum: "사업화",
    icon: <Commercial />,
  },
  {
    text: "인력",
    enum: "인력",
    icon: <Manpower />,
  },
  {
    text: "자금",
    enum: "융자",
    icon: <Funds />,
  },
  {
    text: "판로ㆍ해외진출",
    enum: "판로ㆍ해외진출",
    icon: <Global />,
  },
];

export const getNoticeCategoryInfo = (categoryEnum: string) => {
  return (
    NOTICE_CATEGORY.find((item) => item.enum === categoryEnum) || {
      text: " ",
      icon: " ",
    }
  );
};
