import { ReactComponent as Software } from "@assets/category/software.svg";
import { ReactComponent as Education } from "@assets/category/education.svg";
import { ReactComponent as Health } from "@assets/category/health.svg";
import { ReactComponent as Commerce } from "@assets/category/commerce.svg";
import { ReactComponent as Etc } from "@assets/category/etc.svg";
import { ReactComponent as Coin } from "@assets/category/coin.svg";
import { ReactComponent as Camera } from "@assets/category/camera.svg";

export const JOB_CATEGORY = [
  {
    text: "IT/소프트웨어",
    enum: "IT_SOFTWARE",
    image: <Software />,
    txColor: "#363FB5",
  },
  {
    text: "교육/에듀테크",
    enum: "EDUCATION_EDUTECH",
    image: <Education />,
    txColor: "#6DABE5",
  },
  {
    text: "헬스케어/바이오",
    enum: "HEALTHCARE_BIO",
    image: <Health />,
    txColor: "#76CB5D",
  },
  {
    text: "전자상거래",
    enum: "ECOMMERCE",
    image: <Commerce />,
    txColor: "#E46AC2",
  },
  {
    text: "기타",
    enum: "ETC",
    image: <Etc />,
    txColor: "#9B9B9B",
  },
  {
    text: "핀테크",
    enum: "FINTECH",
    image: <Coin />,
    txColor: "#FFC015",
  },
  {
    text: "콘텐츠/미디어",
    enum: "CONTENT_MEDIA",
    image: <Camera />,
    txColor: "#ED5555",
  },
];

export const getCategoryInfo = (categoryEnum: string) => {
  return (
    JOB_CATEGORY.find((item) => item.enum === categoryEnum) || {
      text: "기타",
      image: <Etc />,
      txColor: "#9B9B9B",
    }
  );
};
