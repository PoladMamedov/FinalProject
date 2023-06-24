
import Benefits from "../sections/Benefits/BenefitsList";
import content from "../sections/Benefits/content.json";
import TopItemsSlider from "../TopItemsSlider/TopItemsSlider";
import OurPartners from "../sections/OurPartners/OurPartners";
import Breadcrumb from "../breadCrumb/breadCrumb";


const Main = () => {
    return (
        <main>
            <Breadcrumb />
            <TopItemsSlider />
            <OurPartners />
            <Benefits content={content} />
        </main>
    );
};

export default Main;
