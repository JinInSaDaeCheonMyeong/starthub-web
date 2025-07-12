import { useNavigate } from "react-router-dom";
import * as S from "./style"

const BoxMenu = () => {
  const navigate = useNavigate();

  return (
    <S.BoxContainer>
      <S.PinkBox>
        <S.BoxContent>
          BMC 설계하기
          <div>AI가 내 아이템을 보고 BMC를 설계해줘요!</div>
          <span>내 BMC 보기</span>
        </S.BoxContent>
        <S.BoxButton $bgColor="#FF71AF" $hvColor="#e85c9c" onClick={()=>{navigate("/")}}>바로가기</S.BoxButton>
      </S.PinkBox>

      <div>
        <S.GreenBox>
          <S.BoxContent>
            경쟁사 분석
            <div>AI가 내 아이템을 보고 시장조사를 해줘요!</div>
          </S.BoxContent>
          <S.BoxButton $bgColor="#64DD91" $hvColor="#4fc97d" onClick={()=>{navigate("/")}}>바로가기</S.BoxButton>
        </S.GreenBox>

        <S.BlueBox>더 좋은 서비스를 경험해보세요!</S.BlueBox>
      </div>

      <div>
        <S.PurpleBox>
          <S.BoxContent>
            기업 등록하기
            <div>AI가 내 아이템을 보고 시장조사를 해줘요!</div>
          </S.BoxContent>
          <S.BoxButton $bgColor="#D290FB" $hvColor="#b875df" onClick={()=>{navigate("/")}}>바로가기</S.BoxButton>
        </S.PurpleBox>

        <div style={{ display: "flex", gap: "14px", marginTop: "14px" }}>
          <S.GrayBox $hvColor="#cccccc" onClick={()=>{navigate("/")}}>최신 공고</S.GrayBox>
          <S.GrayBox $hvColor="#cccccc" onClick={()=>{navigate("/")}}>스타트업 채용</S.GrayBox>
        </div>
      </div>
    </S.BoxContainer>
  );
};

export default BoxMenu;