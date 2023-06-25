import "../../styles/style.scss";

export default function Index(props) {
  const {
    currentStartItemIndex, items, visibleItemCount, flexStart, fullSize, onArrowClick, onItemClick, onCloseCarousel
} = props;
  return (
    <div className={`carousel ${fullSize ? "carousel--full-size" : ""}`} onClick={onCloseCarousel()}>
      {currentStartItemIndex > 0 && items.length > visibleItemCount ? <button type="button" className={`carousel__arrow carousel__left-arrow ${fullSize ? "carousel__left-arrow--full-size" : ""}`} onClick={onArrowClick()}>{"<"}</button> : null }
      <div className={`carousel__items ${flexStart ? "carousel__items--flex-start" : ""} ${fullSize ? "carousel__items--full-size" : ""}`}>
        {items.slice(currentStartItemIndex, currentStartItemIndex + visibleItemCount).map((el, index) => <img className={`carousel__item ${fullSize ? "carousel__item--full-size" : ""}`} src={el} key={index} alt="img" onClick={onItemClick()} />)}
      </div>
      {currentStartItemIndex < items.length - visibleItemCount && items.length > visibleItemCount ? <button type="button" className={`carousel__arrow carousel__right-arrow ${fullSize ? "carousel__right-arrow--full-size" : ""}`} onClick={onArrowClick()}>{">"}</button> : null }
    </div>
  );
}