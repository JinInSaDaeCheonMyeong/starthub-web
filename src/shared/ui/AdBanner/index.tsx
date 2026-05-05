import { ReactComponent as Rocket } from "@/assets/images/rocket.svg";
import { ReactComponent as Stars } from "@/assets/images/stars.svg";

const AdBanner = () => {
  return (
    <div
      className="w-full h-[94px] flex justify-center"
      style={{ background: "linear-gradient(90deg, #74a0ff 21%, #000000 91%)" }}
    >
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0 flex justify-center items-center h-full">
        <Rocket className="w-[60px] h-[72px] md:w-[83px] md:h-[100px] mr-3 md:mr-5" />
        <span className="font-pt-h2-semibold text-hub-white-1 text-sm md:text-base lg:text-lg text-center">
          프리미엄 서비스에 대해 궁금하신가요?
        </span>
        <Stars className="w-[60px] h-[72px] md:w-[86px] md:h-full ml-3 md:ml-5" />
      </div>
    </div>
  );
};

export default AdBanner;
