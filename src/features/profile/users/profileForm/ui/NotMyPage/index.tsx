import styled from "styled-components";
import Image from "@assets/images/not_found_user.png";

const NotMyPage = () => {
  return (
    <WrapNotMyPage>
      <WrapContent>
        <img
          src={Image}
          style={{ width: "100%", height: "auto", marginTop: "15px" }}
        />
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
`;
