import * as S from "./style";
import { ReactComponent as Arrow } from "@assets/icons/arrow.svg";
import { getNoticeCategoryInfo } from "@/shared/utils/NoticeCategory/noticeCategory";
import Layout from "@/shared/ui/Layout";
import { useNavigate } from "react-router-dom";

const data = {
  aply_excl_trgt_ctnt: "공고문 신청 제외 대상 참고",
  aply_mthd_onli_rcpt_istc:
    "https://www.k-startup.go.kr/web/contents/webPMSBizUnvs.do?returnUrl=/screen/BMO0101M01?pbancId=0627701",
  aply_trgt_ctnt:
    "「중소기업기본법」 제2조제1항 및 「중소기업창업 지원법」에 따른 초기창업기업 대표자로서 모집공고일 기준 딥테크 5대 분야 기술을 보유한 창업 3년 이내인 자(기업)\r\n ※ 딥테크 5대 분야 : ①빅데이터·AI, ②바이오·헬스, ③미래모빌리티, ④로봇, ⑤친환경·에너지\r\n ※ 신청가능 업력 : 2022년 7월 11일로부터 창업 3년 이내 기업\r\n ※ 그 외 세부 신청자격은 모집공고문 참고",
  biz_pbanc_nm: "2025년도 초기창업패키지(딥테크 분야) 모집공고",
  pbanc_ctnt:
    "딥테크 기술을 보유한 초기 단계 창업기업의 사업 안정화 성장을 지원하는 『2025년도 초기창업패키지(딥테크 분야)』에 참여할 창업기업을 다음과 같이 모집합니다.",
  pbanc_rcpt_bgng_dt: "20250711",
  pbanc_rcpt_end_dt: "20250804",
  supt_regin: "전국",
  biz_enyy: "1년미만,2년미만,3년미만",
  biz_trgt_age: "만 20세 미만,만 20세 이상 ~ 만 39세 이하,만 40세 이상",
  prch_cnpl_no: "1357",
  detl_pg_url:
    "https://www.k-startup.go.kr/web/contents/bizpbanc-ongoing.do?schM=view&pbancSn=174170",
};

const formatDate = (yyyymmdd: string) => {
  return `${yyyymmdd.slice(0, 4)}년 ${yyyymmdd.slice(4, 6)}월 ${yyyymmdd.slice(
    6
  )}일`;
};

const NoticeDetail = () => {
  const categoryInfo = getNoticeCategoryInfo("FUNDS");
  const navigate = useNavigate();

  return (
    <Layout>
      <S.DetailContainer>
        <Arrow
          style={{ transform: "scaleX(-1)", marginBottom: "20px", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <S.CategoryContainer>
          {categoryInfo.icon}
          <span>{categoryInfo.text}</span>
        </S.CategoryContainer>

        <S.TitleText>{data.biz_pbanc_nm}</S.TitleText>
        <S.Detailborder />

        <S.Section>
          <S.SectionTitle>공고 개요</S.SectionTitle>
          <S.SectionBox>
            <p>{data.pbanc_ctnt}</p>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>모집 기간</S.SectionTitle>
          <S.SectionBox>
            <p>
              {formatDate(data.pbanc_rcpt_bgng_dt)} ~{" "}
              {formatDate(data.pbanc_rcpt_end_dt)}
            </p>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>지원 지역</S.SectionTitle>
          <S.SectionBox>
            <p>{data.supt_regin}</p>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>신청 대상</S.SectionTitle>
          <S.SectionBox>
            <p
              dangerouslySetInnerHTML={{
                __html: data.aply_trgt_ctnt.replace(/\r\n/g, "<br />"),
              }}
            />
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>신청 제외 대상</S.SectionTitle>
          <S.SectionBox>
            <p>{data.aply_excl_trgt_ctnt}</p>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>지원 내용</S.SectionTitle>
          <S.SectionBox>
            <ul>
              <li>해외 시장 실증(PoC) 사업화 지원</li>
              <li>해외 진출 컨설팅 및 마케팅 지원</li>
              <li>비용 일부 정부 지원 (자금, 운영 등)</li>
            </ul>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>신청 방법</S.SectionTitle>
          <S.SectionBox>
            <p>
              <a
                href={data.aply_mthd_onli_rcpt_istc}
                target="_blank"
                rel="noopener noreferrer"
              >
                온라인 접수 바로가기
              </a>
            </p>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>지원 가능 업력</S.SectionTitle>
          <S.SectionBox>
            <p>{data.biz_enyy}</p>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>지원 대상 연령</S.SectionTitle>
          <S.SectionBox>
            <ul>
              {data.biz_trgt_age.split(",").map((age, idx) => (
                <li key={idx}>{age}</li>
              ))}
            </ul>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>문의처</S.SectionTitle>
          <S.SectionBox>
            <p>중소벤처기업부 고객센터 {data.prch_cnpl_no}</p>
          </S.SectionBox>
        </S.Section>

        <S.Section>
          <S.SectionTitle>상세 페이지</S.SectionTitle>
          <S.SectionBox>
            <p>
              <a
                href={data.detl_pg_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                상세 공고 보기
              </a>
            </p>
          </S.SectionBox>
        </S.Section>
      </S.DetailContainer>
    </Layout>
  );
};

export default NoticeDetail;
