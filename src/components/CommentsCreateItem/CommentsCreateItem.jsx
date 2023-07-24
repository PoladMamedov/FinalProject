import React, { useRef, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { addNewCommentAsync } from "../../redux/actions/comments";

export default function CommentsCreateItem({productID}) {
  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");

  const { userInfo: { token, firstName, lastName } } = useSelector((state) => state.user );
  const dispatch = useDispatch();

  function onBtnClick() {
    textareaRef.current.value = "";
    dispatch(addNewCommentAsync({
      product: productID,
      content: comment
    }, token));
  }

  return <div className="comments__create-item">
    <Avatar className="comments__create-item-avatar" name={`${firstName} ${lastName}`} size="50" round/>
    <textarea
      className="comments__create-item-content"
      name="comment-content"
      id="comment-content"
      placeholder="Add a review…"
      ref={textareaRef}
      onChange={() => setComment(textareaRef.current.value)}
    ></textarea>
    <button
      disabled={comment === ""}
      type="button"
      className="button comments__send-btn"
      onClick={onBtnClick}
    >
      Send
    </button>
  </div>;
}