import Benefits from "../../components/OurBenefits/OurBenefitsList";
import OurPartners from "../../components/OurPartners/OurPartners";
import TopItemsSlider from "../../components/TopItemsSlider/TopItemsSlider";
import TopProductItem from "../../components/OOtopProductItems/TopProductsItems";
import content from "../../components/OurBenefits/content.json";
import Breadcrumb from "../../components/OObreadCrumb/BreadCrumb";


const Home = () => {
    return (
        <>
        <Breadcrumb />
        <TopItemsSlider />
        <OurPartners />
        <TopProductItem />
        <Benefits content={content}/>
        </>
    );
};

export default Home;
