const enumMap: Record<string, string> = {
  PRE_STARTUP: "예비창업",
  EARLY_STAGE: "초기창업",
  STARTUP: "창업",
  SCALE_UP: "스케일업",
  CONTENT_MEDIA: "콘텐츠/미디어",
  FINTECH: "핀테크",
  HEALTHCARE_BIO: "헬스케어/바이오",
  EDUCATION_EDUTECH: "교육/에듀테크",
  IT_SOFTWARE: "IT/소프트웨어",
  ECOMMERCE: "이커머스",
  ETC: "기타",
};

export const convertEnumToKorean = (text: string): string => {
  return text.replace(
    /\b(PRE_STARTUP|EARLY_STAGE|STARTUP|SCALE_UP|CONTENT_MEDIA|FINTECH|HEALTHCARE_BIO|EDUCATION_EDUTECH|IT_SOFTWARE|ECOMMERCE|ETC)\b/g,
    (match) => enumMap[match] || match,
  );
};
