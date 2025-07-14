import styled from "styled-components";
import { ReactComponent as Rocket } from "@/assets/images/rocket.svg";
import { ReactComponent as Stars } from "@/assets/images/stars.svg";
import { StartHubColors, StartHubFont } from "@/shared/design";

const AdBanner = () => {
  return (
    <Backgound>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <RocketImg />
        <Text>프리미엄 서비스에 대해 궁금하신가요?</Text>
        <Star />
      </div>
    </Backgound>
  );
};

export default AdBanner;

const Backgound = styled.div`
  width: 100%;
  height: 94px;
  background: linear-gradient(90deg, #74a0ff 21%, #000000 91%);
  padding: 0 200px;
`;

const RocketImg = styled(Rocket)`
  width: 83px;
  height: 100px;
  margin-right: 20px;
`;

const Text = styled.span`
  color: ${StartHubColors.White1};
  ${StartHubFont.Pretendard.Headlines2.SemiBold};
`;

const Star = styled(Stars)`
  width: 86px;
  height: 100%;
  margin-right: 20px;
`;
