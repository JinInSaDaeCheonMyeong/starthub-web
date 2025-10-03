import styled from "styled-components";
import NoUser from "@assets/images/nouser.png";
import { StartHubFont } from "@/shared/design";
const NotMyPage = () => {
  return (
    <WrapNotMyPage>
      <WrapContent>
        <img src={NoUser} style={{ width: "198px", height: "auto" }}></img>
        <p>로그인 후 더 많은 서비스를 이용하실 수 있어요</p>
        USER NOT FOUND
      </WrapContent>
    </WrapNotMyPage>
  );
};

export default NotMyPage;

const WrapNotMyPage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${StartHubFont.Pretendard.Title2}
  font-weight: 500;
  gap: 10px;
  p {
    ${StartHubFont.Pretendard.Body2.Medium}
  }
  svg {
    width: 198px;
    height: 72px;
  }
`;
