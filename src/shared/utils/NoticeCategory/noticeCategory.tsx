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
    enum: "FUNDS",
    icon: <Funds />,
  },
  {
    text: "시설",
    enum: "FACILITY",
    icon: <Facility />,
  },
  {
    text: "교육",
    enum: "SCHOOLING",
    icon: <Schooling />,
  },
  {
    text: "R&D",
    enum: "R&D",
    icon: <Light />,
  },
  {
    text: "행사",
    enum: "EVENT",
    icon: <Calender />,
  },
  {
    text: "글로벌",
    enum: "GLOBAL",
    icon: <Global />,
  },
  {
    text: "사업화",
    enum: "COMMERCIALIZATION",
    icon: <Commercial />,
  },
  {
    text: "인력",
    enum: "MANPOWER",
    icon: <Manpower />,
  },
];
//enum은 예시, 실제 서버 연동시 실제 tag Enum

export const getNoticeCategoryInfo = (categoryEnum: string) => {
  return (
    NOTICE_CATEGORY.find((item) => item.enum === categoryEnum) || {
      text: " ",
      icon: " ",
    }
  );
};
