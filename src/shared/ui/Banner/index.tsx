import BannerImg from "@assets/images/image.png";

const Banner = () => {
  return (
    <>
      <img
        src={BannerImg.src}
        className="h-[274px] w-100% object-cover"
        alt="banner"
      />
    </>
  );
};
export default Banner;
