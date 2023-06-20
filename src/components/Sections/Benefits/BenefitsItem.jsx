
const BenefitsItem = (props) => {


    return (
        <li className='benefits-section-list__item'>
            <a href='#' className='benefits-section-list__item-link'>
                <img src={props.data.src} className='benefits-section-list__item-img'></img>
                <h3 className='benefits-section-list__item-title'>{props.data.title}</h3>
            </a>
            <p className='benefits-section-list__item-text'>{props.data.text}</p>
        </li>
    );
};
export default BenefitsItem;
