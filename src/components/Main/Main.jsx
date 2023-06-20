import Benefits from "../Sections/Benefits/BenefitsList";
import content from "../Sections/Benefits/content.json";
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
