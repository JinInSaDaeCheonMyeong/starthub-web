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
      return `https://start-hub.kr/bmc/${id}`;
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

export const parseAnnotations = (text: string): string =>
  text.replace(
    /\[\[([A-Z]+):(\d+)(?::([\s\S]+?))?\]\]/g,
    (_, type, id, rest) => {
      let label = rest ?? "";
      let url: string | undefined = undefined;

      if (label) {
        const m = label.match(/(https?:\/\/[^\s\]]+|www\.[^\s\]]+)/i);
        if (m) {
          url = m[0];
          label = (
            label.slice(0, m.index) + label.slice((m.index || 0) + m[0].length)
          ).trim();
        }
      }

      label = label.replace(/^[\s:\[]+|[\s:\]]+$/g, "").trim();

      if (url && url.startsWith("www.")) url = `https://${url}`;

      const resolvedUrl = resolveUrl(
        type as AnnotationType,
        id,
        url || undefined,
      );
      const finalLabel = label || defaultLabel(type);

      const safeLabel = finalLabel.replace(/\[|\]/g, "");
      return `[${safeLabel}](${resolvedUrl})`;
    },
  );
