import { useEffect, useState } from "react";
import { bmcApi } from "@/entities/bmc/api/bmc";
import StartHubAIAttachFile from "@/shared/ui/AIAttachFile";

interface BmcChatCardProps {
  bmcId: number;
}

const BmcChatCard = ({ bmcId }: BmcChatCardProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    bmcApi
      .getCanvasesDetail(String(bmcId))
      .then((res: any) => {
        const data = res.data ?? res;
        setTitle(data.title ?? "BMC");
        const raw = data.createdAt ?? "";
        setDate(raw ? new Date(raw).toLocaleDateString("ko-KR") : "");
      })
      .catch(() => {
        setTitle("BMC");
      });
  }, [bmcId]);

  if (!title) return null;

  return (
    <StartHubAIAttachFile title={title} date={date} link={`/bmc/${bmcId}`} />
  );
};

export default BmcChatCard;
