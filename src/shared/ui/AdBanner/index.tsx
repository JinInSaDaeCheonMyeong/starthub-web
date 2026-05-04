import { ReactComponent as Rocket } from "@/assets/images/rocket.svg";
import { ReactComponent as Stars } from "@/assets/images/stars.svg";

const AdBanner = () => {
  return (
    <div
      className="w-full h-[94px] px-[200px]"
      style={{ background: "linear-gradient(90deg, #74a0ff 21%, #000000 91%)" }}
    >
      <div className="flex justify-center items-center h-full">
        <Rocket className="w-[83px] h-[100px] mr-5" />
        <span className="font-pt-h2-semibold text-hub-white-1">
          프리미엄 서비스에 대해 궁금하신가요?
        </span>
        <Stars className="w-[86px] h-full mr-5" />
      </div>
    </div>
  );
};

export default AdBanner;
