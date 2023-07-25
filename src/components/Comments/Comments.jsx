import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentsItem from "../CommentsItem/CommentsItem";
import CommentsCreateItem from "../CommentsCreateItem/CommentsCreateItem";
import { fetchComments } from "../../redux/actions/comments";


export default function Comments({targetID, target = "", productID = ""}) {

  const [showLoginLink, setShowLoginLink] = useState(false);
  const [disableActionBtns, setDisableActionBtns] = useState(false);

  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);
  const { userInfo: {token} } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchComments(target, targetID));
  }, [targetID]);

  function onAddReviewClick() {
    setShowLoginLink(true);
  }

  return <>
    <section className="comments">
      <div className="container">
        <h1 className="comments__title">Reviews</h1>
        {
          comments.length
            ? <ul className="comments__list">
                {comments.map((comment, index) => <li
                  key={index}
                  className="comments__item">
                  <CommentsItem
                    {...comment}
                    disableActionBtns={disableActionBtns}
                    setDisableActionBtns={setDisableActionBtns}
                  />
                </li>)}
              </ul>
            : <p className="comments__item">Write the first review...</p>
        }
        {
          token
          ? <CommentsCreateItem
              productID={target === "product" ? targetID : productID}
              disableActionBtns={disableActionBtns}
              setDisableActionBtns={setDisableActionBtns}
            />
          : <>
            {showLoginLink && <p className="comments__login-message">Only authorized user can add review. <br/> Please, <Link to={"/login"} className="comments__login-message-link">log in</Link> first!</p>}
            {!showLoginLink && <button
              type="button"
              className="button comments__add-btn"
              onClick={onAddReviewClick}
            >
              Add review
            </button>}
          </>
        }
      </div>
    </section>
  </>;
}