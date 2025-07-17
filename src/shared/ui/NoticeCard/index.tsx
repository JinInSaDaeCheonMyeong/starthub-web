import * as S from "./style";
import { ReactComponent as Map } from "@assets/category/map.svg";
import { ReactComponent as Person } from "@assets/category/person.svg";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import { NoticeData } from "@/entities/notice/model/notice.type";

interface NoticeCardProps {
  notice: NoticeData;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ notice }) => {
  if (!notice) {
    return null;
  }

  const categoryInfo = getNoticeCategoryInfo(notice.supt_biz_clsfc);

  const getApplyTargetDisplay = () => {
    if (!notice.aply_trgt) return '';
    
    const targets = notice.aply_trgt.split(',').map(target => target.trim()).filter(target => target);
    if (targets.length === 0) return '';
    if (targets.length === 1) return targets[0];
    return `${targets[0]} 등`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    if (dateString.length === 8) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${year}.${month}.${day}.`;
    }
    return dateString;
  };

  const applyTargetDisplay = getApplyTargetDisplay();

  const handleClick = () => {
    if (notice.detl_pg_url) {
      window.open(notice.detl_pg_url, "_blank");
    }
  };

  return (
    <S.NoticeContainer onClick={handleClick} style={{ cursor: "pointer" }}>
      <S.CategoryContainer>
        {categoryInfo.icon}
        <span>{categoryInfo.text}</span>
      </S.CategoryContainer>
      <S.TitleText>{notice.biz_pbanc_nm || '제목 없음'}</S.TitleText>
      <p>모집 기간 {formatDate(notice.pbanc_rcpt_bgng_dt)}~{formatDate(notice.pbanc_rcpt_end_dt)}</p>
      <div style={{ display: "flex", gap: "4px" }}>
        <S.Tag>
          <Map style={{ marginRight: "2px" }} />
          {notice.supt_regin || '지역 정보 없음'}
        </S.Tag>
        {applyTargetDisplay && (
          <S.Tag>
            <Person />
            {applyTargetDisplay}
          </S.Tag>
        )}
      </div>
    </S.NoticeContainer>
  );
};

export default NoticeCard;
