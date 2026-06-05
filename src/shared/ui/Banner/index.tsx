import Image from "next/image";
import bannerImage from "@/assets/images/image.webp";
import mobileBanner from "@/assets/images/mobile-banner.png";

const Banner = () => {
  return (
    <div className="mt-[92px] md:mt-[110px] w-screen -ml-[calc((100vw-100%)/2)]">
      <div className="md:hidden w-full h-[200px]">
        <Image
          src={mobileBanner}
          alt="StartHub 모바일 배너"
          className="w-full h-full object-fill"
          priority
        />
      </div>
      <div className="hidden md:block w-full h-[274px]">
        <Image
          src={bannerImage}
          alt="StartHub 배너"
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Banner;
