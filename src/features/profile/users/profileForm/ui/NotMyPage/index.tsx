import NoUser from "@assets/images/nouser.png";

const NotMyPage = () => {
  return (
    // WrapNotMyPage
    <div className="flex justify-center w-full mt-20">
      {/* WrapContent */}
      <div className="flex flex-col items-center justify-center font-pt-title2 font-medium gap-2.5 [&_svg]:w-[198px] [&_svg]:h-[72px]">
        <img src={NoUser.src} className="w-[198px] h-auto" />
        <p className="font-pt-body2-medium">
          로그인 후 더 많은 서비스를 이용하실 수 있어요
        </p>
      </div>
    </div>
  );
};

export default NotMyPage;
