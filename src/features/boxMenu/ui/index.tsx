import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { toast } from "react-toastify";

const BoxMenu = () => {
  const navigate = useNavigate();
  
   const handleNavigate = (path: string) => { 
    if (path === "/competitor") {
      toast.error("경쟁사 분석 기능은 현재 준비 중입니다. 곧 만나보실 수 있어요!");
      return;
    }
    if (path === "/team-building") {
      toast.error("창업 멤버 모집 기능은 현재 준비 중입니다. 곧 만나보실 수 있어요!");
      return;
    }
    navigate(path);
  };

  return (
    <S.BoxContainer>
      <S.PinkBox>
        <S.BoxContent>
          BMC 설계하기
          <div>AI가 내 아이템을 보고 BMC를 설계해줘요!</div>
          <span>내 BMC 보기</span>
        </S.BoxContent>
        <S.BoxButton
          $bgColor="#FF71AF"
          $hvColor="#e85c9c"
          onClick={() => {
            handleNavigate("/bmc");
          }}
        >
          바로가기
        </S.BoxButton>
      </S.PinkBox>

      <div>
        <S.GreenBox>
          <S.BoxContent>
            경쟁사 분석
            <div>AI가 내 아이템을 보고 시장조사를 해줘요!</div>
          </S.BoxContent>
          <S.BoxButton
            $bgColor="#64DD91"
            $hvColor="#4fc97d"
            onClick={() => {
              handleNavigate("/competitor");
            }}
          >
            바로가기
          </S.BoxButton>
        </S.GreenBox>

        <S.BlueBox>더 좋은 서비스를 경험해보세요!</S.BlueBox>
      </div>

      <div>
        <S.PurpleBox>
          <S.BoxContent>
            기업 등록하기
            <div>AI가 내 아이템을 보고 시장조사를 해줘요!</div>
          </S.BoxContent>
          <S.BoxButton
            $bgColor="#D290FB"
            $hvColor="#b875df"
            onClick={() => {
              handleNavigate("/my-profile");
            }}
          >
            바로가기
          </S.BoxButton>
        </S.PurpleBox>

        <div style={{ display: "flex", gap: "14px", marginTop: "14px" }}>
          <S.GrayBox
            $hvColor="#cccccc"
            onClick={() => {
              handleNavigate("/notices");
            }}
          >
            최신 공고
          </S.GrayBox>
          <S.GrayBox
            $hvColor="#cccccc"
            onClick={() => {
              handleNavigate("/team-building");
            }}
          >
            스타트업 채용
          </S.GrayBox>
        </div>
      </div>
    </S.BoxContainer>
  );
};

export default BoxMenu;