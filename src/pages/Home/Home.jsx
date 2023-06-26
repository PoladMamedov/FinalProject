import Benefits from "../../components/sections/Benefits/BenefitsList";
import OurPartners from "../../components/sections/OurPartners/OurPartners";
import TopItemsSlider from "../../components/sections/TopItemsSlider/TopItemsSlider";
import TopProductItem from "../../components/topProductItem";
import content from "../../components/sections/Benefits/content.json";
import Breadcrumb from "../../components/breadCrumb/breadCrumb";


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
