
import Benefits from "../sections/benefits/BenefitsList.jsx";
import content from "../sections/benefits/content.json";
import TopItemsSlider from "../TopItemsSlider/TopItemsSlider.jsx";

const Main = () => {
    return (
        <main>
            <div className="containerSlider">
                <TopItemsSlider />
            </div>
            <Benefits content={content} />
        </main>
    );
};

export default Main;
