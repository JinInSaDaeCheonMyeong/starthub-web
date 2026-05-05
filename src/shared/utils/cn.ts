/**
 * 클래스 이름들을 안전하게 조합하는 유틸리티 함수
 * 조건부 클래스 적용에 사용됨
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'rounded')
 * // 결과: 'px-4 py-2 bg-blue-500 rounded'
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes
    .filter((cls): cls is string => Boolean(cls) && typeof cls === "string")
    .join(" ");
};
