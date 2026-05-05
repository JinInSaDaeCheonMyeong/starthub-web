import LikeListForm from "@/features/profile/users/likeListForm"

const LikeList = () => {
  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <LikeListForm />
      </div>
    </div>
  );
};

export default LikeList;
