
import Benefits from "../sections/Benefits/BenefitsList";
import content from "../sections/Benefits/content.json";
import TopItemsSlider from "../TopItemsSlider/TopItemsSlider";
import TopProductItem from "../topProductItem"


const Main = () => {
    return (
        <main>
          <TopProductItem />
       <TopItemsSlider />
          <Benefits content={content}/>
        </main>
    );
};

export default Main;
