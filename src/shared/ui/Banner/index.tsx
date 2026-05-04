import bannerImage from "@/assets/images/image.png";
import mobileBanner from "@/assets/images/mobile-banner.png";

const Banner = () => {
  return (
    <div className="mt-[92px] md:mt-[110px] w-screen -ml-[calc((100vw-100%)/2)]">
      {/* Mobile Banner */}
      <div className="md:hidden w-full h-[200px]">
        <img
          src={mobileBanner.src}
          alt="StartHub 모바일 배너"
          className="w-full h-full object-fill"
        />
      </div>

      {/* Desktop Banner */}
      <div className="hidden md:block w-full h-[274px]">
        <img
          src={bannerImage.src}
          alt="StartHub 배너"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
