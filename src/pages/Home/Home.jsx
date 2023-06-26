import Benefits from "../../components/OurBenefitsList/OurBenefitsList";
import OurPartners from "../../components/OurPartners/OurPartners";
import TopItemsSlider from "../../components/TopItemsSlider/TopItemsSlider";
import TopProductItem from "../../components/TopProductItems/TopProductsItems";
import content from "../../components/OurBenefitsList/content.json";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

const Home = () => {
  return (
    <>
      <Breadcrumb />
      <TopItemsSlider />
      <OurPartners />
      <TopProductItem />
      <Benefits content={content} />
    </>
  );
};

export default Home;
