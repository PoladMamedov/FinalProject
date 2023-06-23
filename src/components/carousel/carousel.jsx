import "../../styles/style.scss";

export default function Carousel(props) {
  const {
    currentCarouselStart, imageUrls, visibleItemCount, onArrowClick, onItemClick
} = props;
  return (
    <div className="carousel">
      {currentCarouselStart > 0 && imageUrls.length > visibleItemCount ? <button type="button" className="carousel__arrow carousel__left-arrow" onClick={onArrowClick()}>{"<"}</button> : null }
      <div className="carousel__items">
        {imageUrls.slice(currentCarouselStart, currentCarouselStart + visibleItemCount).map((el, index) => <img className="carousel__item" src={el} key={index} alt="img" onClick={onItemClick()} />)}
      </div>
      {currentCarouselStart < imageUrls.length - visibleItemCount && imageUrls.length > visibleItemCount ? <button type="button" className="carousel__arrow carousel__right-arrow" onClick={onArrowClick()}>{">"}</button> : null }
    </div>
  );
}