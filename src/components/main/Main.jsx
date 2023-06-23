
import Benefits from "../sections/Benefits/BenefitsList";
import content from "../sections/Benefits/content.json";
import TopItemsSlider from "../TopItemsSlider/TopItemsSlider";
import OurPartners from "../OurPartners/OurPartners";

const Main = () => {
    return (
        <main>
            <TopItemsSlider />
            <OurPartners />
            <Benefits content={content} />
        </main>
    );
};

export default Main;
