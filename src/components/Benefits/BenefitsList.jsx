import React from 'react';
import BenefitsItem from './BenefitsItem';
import "./benefits.scss";

const Benefits = (props) => {
    const content = props.data;

    return (
        <section className='benefits-section'>
            <div className='container'>
                <h2 className='section-title'>Benefits Using Our Service</h2>
                <ul className='benefits-section-list'>
                    {content.map((item, index) => <BenefitsItem key={index} data={item} />)}
                </ul>
            </div>
        </section>
    );
}

export default Benefits;
