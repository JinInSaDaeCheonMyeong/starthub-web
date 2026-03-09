export type AnnotationType = "ANNOUNCEMENT" | "BMC" | "ANALYSIS";

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
      return `https://start-hub.kr/competitor/analysis?bmcId=${id}`;
    default:
      return "#";
  }
};

export const parseAnnotations = (text: string): string =>
  text.replace(
    /\[\[([A-Z]+):(\d+):([^:\]]+)(?::([^\]]*))?\]\]/g,
    (_, type, id, label, url) => {
      const resolvedUrl = resolveUrl(
        type as AnnotationType,
        id,
        url || undefined,
      );
      return `[${label}](${resolvedUrl})`;
    },
  );
