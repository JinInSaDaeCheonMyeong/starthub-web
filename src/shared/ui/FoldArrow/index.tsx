"use client";
import * as S from "./style";
import { ReactComponent as FoldArrowIcon } from "@assets/icons/fold-arrow.svg";
import { useRouter } from "next/navigation";



interface FoldArrowProps {
  title: string;
  backPath?: string;
}

const FoldArrow= ({ title, backPath = "/" }: FoldArrowProps) => {
  const router = useRouter();

  return (
    <S.FoldArrowContainer>
      <FoldArrowIcon onClick={() => router.push(backPath)} />
      <span>{title}</span>
    </S.FoldArrowContainer>
  );
};

export default FoldArrow;


