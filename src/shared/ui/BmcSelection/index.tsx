import { useQuery } from "@tanstack/react-query";
import { bmcApi } from "@/entities/bmc/api/bmc";
import BmcCard from "../CompetitorBmcCard";
import { BmcSelectionSkeleton } from "./BmcSelectionSkeleton";
import * as S from "./style";

const BmcList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bmc", "canvases"],
    queryFn: bmcApi.getCanvases,
  });

  if (isLoading) {
    return <BmcSelectionSkeleton />;
  }

  if (error) {
    return (
      <S.Container>
        <S.Text>BMC 목록을 불러오는데 실패했습니다.</S.Text>
      </S.Container>
    );
  }

  const canvases = data?.data || [];

  return (
    <S.Container>
      <S.Text>먼저 원하는 BMC를 선택해 주세요.</S.Text>
      <S.BmcTemplateContainer>
        {canvases.map((canvas) => (
          <BmcCard
            key={canvas.id}
            bmcId={Number(canvas.id)}
            title={canvas.title}
            date={new Date(canvas.createdAt).toLocaleDateString("ko-KR")}
          />
        ))}
      </S.BmcTemplateContainer>
    </S.Container>
  );
};

export default BmcList;
