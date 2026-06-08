import BmcList from "@/shared/ui/BmcList";
import BmcTemplateCard from "@/entities/bmc/ui/BmcTemplateCard";

const BmcPage = () => {
  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <BmcTemplateCard />
        <BmcList />
      </div>
    </div>
  );
};

export default BmcPage;
