export type AnnotationType = "ANNOUNCEMENT" | "BMC" | "ANALYSIS" | "SCHEDULE";

const resolveUrl = (
  type: AnnotationType,
  id: string,
  rawUrl?: string,
): string => {
  if (rawUrl) return rawUrl;
  switch (type) {
    case "ANNOUNCEMENT":
      return `https://start-hub.kr/notice/${id}`;
    case "BMC":
      return `https://start-hub.kr/bmc/detail/${id}`;
    case "ANALYSIS":
      return `https://start-hub.kr/competitor/create?bmcId=${id}`;
    case "SCHEDULE":
      return `https://start-hub.kr/notice/${id}`;
    default:
      return "#";
  }
};

const defaultLabel = (type: string): string => {
  switch (type) {
    case "BMC":
      return "BMC 보기";
    case "ANALYSIS":
      return "경쟁사 분석 보기";
    case "SCHEDULE":
      return "일정 보기";
    case "ANNOUNCEMENT":
      return "공고 보기";
    default:
      return type;
  }
};

// [[TYPE:ID]] 또는 [[TYPE:ID:LABEL]] 또는 [[TYPE:ID:LABEL:URL]] 형태 모두 지원
// 모든 타입을 마크다운 링크로 변환
export const parseAnnotations = (text: string): string =>
  text.replace(
    /\[\[([A-Z]+):(\d+)(?::([^:\]]+))?(?::([^\]]*))?\]\]/g,
    (_, type, id, label, url) => {
      const resolvedUrl = resolveUrl(
        type as AnnotationType,
        id,
        url || undefined,
      );
      return `[${label || defaultLabel(type)}](${resolvedUrl})`;
    },
  );
