import Benefits from "../Sections/benefits/BenefitsList";
import content from "../Sections/benefits/content.json";

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
