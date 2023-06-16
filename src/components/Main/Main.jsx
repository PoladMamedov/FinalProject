import React from 'react';
import Benefits from '../Benefits/BenefitsList';
import content from "../Benefits/content.json";

const Main = () => {
    return (
        <main>
          <Benefits data={content}/>
        </main>
    );
}

export default Main;
