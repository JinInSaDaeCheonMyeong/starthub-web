import { useEffect, useState } from "react";
import { NoticeApi } from "@/entities/notice/api/notice";
import StartHubAIAttachFile from "@/shared/ui/AIAttachFile";

interface ScheduleChatCardProps {
  announcementId: number;
}

const ScheduleChatCard = ({ announcementId }: ScheduleChatCardProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    NoticeApi.getNoticeDetail({ id: announcementId })
      .then((data: any) => {
        setTitle(data.title ?? "공고");
        setDate(data.receptionPeriod ?? "");
      })
      .catch(() => {
        setTitle("공고");
      });
  }, [announcementId]);

  if (!title) return null;

  return (
    <StartHubAIAttachFile title={title} date={date} link={`/notice/${announcementId}`} />
  );
};

export default ScheduleChatCard;
