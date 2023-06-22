import Benefits from "../sections/Benefits/BenefitsList";
import content from "../sections/Benefits/content.json";
import TopItemsSlider from "../TopItemsSlider/TopItemsSlider";

const Main = () => {
    return (
        <main>
        <div className="containerSlider">
       <TopItemsSlider />
      </div>
          <Benefits content={content}/>
        </main>
    );
};

export default Main;
