import BmcCard from '../BmcCard';
import * as S from './style';

const BmcList = () => {
  return (
    <S.Container>
      <S.Text>최근 BMC</S.Text>
      <S.BmcTemplateContainer>
        <BmcCard title="allways - 감정 기반 AI 채팅 앱" date="2025-07-10"/>
        <BmcCard title="WorkNest - 프리랜서 협업 공간 예약 플랫폼" date="2025-07-01"/>
        <BmcCard title="LangBridge - 언어 교환 매칭 서비스" date="2025-06-25"/>
        <BmcCard title="RentWise - 대학생 중고 렌탈 서비스" date="2025-06-19"/>
      </S.BmcTemplateContainer>
      <S.BmcTemplateContainer>
        <BmcCard title="MealMatch - AI 식단 추천 플랫폼" date="2025-06-14"/>
        <BmcCard title="FitEasy - 초보자 전용 홈트레이닝 앱" date="2025-06-11"/>
        <BmcCard title="StudySync - 집중 공부 메이트 앱" date="2025-06-05"/>
        <BmcCard title="EcoPet - 반려동물 친환경 용품 플랫폼" date="2025-06-02"/>
      </S.BmcTemplateContainer>
    </S.Container>
  )
}

export default BmcList;