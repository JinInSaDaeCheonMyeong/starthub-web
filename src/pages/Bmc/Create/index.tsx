import BmcList from "@/shared/ui/BmcList";
import BmcTemplateCard from "@/shared/ui/BmcTemplateCard";
import Layout from '@/shared/ui/Layout';
const BmcPage = () => {

  return (
    <Layout>
      <BmcTemplateCard/>
      <BmcList/>
    </Layout>
  );
};

export default BmcPage;