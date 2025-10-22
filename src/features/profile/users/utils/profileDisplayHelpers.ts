export const formatGender = (gender?: string | null): string =>
  gender === "MALE" ? "남자" : gender === "FEMALE" ? "여자" : "-";

export const formatCurrency = (amount?: number | null): string =>
  typeof amount === "number" ? `${amount.toLocaleString()}원` : "-";

export const formatEmployees = (count?: number | null): string =>
  typeof count === "number" ? `${count}명` : "-";

export const safeValue = (value?: string | null): string => value || "-";
