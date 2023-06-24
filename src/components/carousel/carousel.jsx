import "../../styles/style.scss";

export default function Carousel(props) {
  const {
    currentStartItemIndex, items, visibleItemCount, flexStart, fullSize, onArrowClick, onItemClick, onCloseCarousel
} = props;
  return (
    <div className={`carousel ${fullSize ? "carousel_full-size" : ""}`} onClick={onCloseCarousel()}>
      {currentStartItemIndex > 0 && items.length > visibleItemCount ? <button type="button" className={`carousel__arrow carousel__left-arrow ${fullSize ? "carousel__left-arrow_full-size" : ""}`} onClick={onArrowClick()}>{"<"}</button> : null }
      <div className={`carousel__items ${flexStart ? "carousel__items_flex-start" : ""} ${fullSize ? "carousel__items_full-size" : ""}`}>
        {items.slice(currentStartItemIndex, currentStartItemIndex + visibleItemCount).map((el, index) => <img className={`carousel__item ${fullSize ? "carousel__item_full-size" : ""}`} src={el} key={index} alt="img" onClick={onItemClick()} />)}
      </div>
      {currentStartItemIndex < items.length - visibleItemCount && items.length > visibleItemCount ? <button type="button" className={`carousel__arrow carousel__right-arrow ${fullSize ? "carousel__right-arrow_full-size" : ""}`} onClick={onArrowClick()}>{">"}</button> : null }
    </div>
  );
}