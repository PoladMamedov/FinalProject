import React, { useRef, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { addNewCommentAsync } from "../../redux/actions/comments";

export default function CommentsCreateItem({
 productID, disableActionBtns, setDisableActionBtns, maxContentLen = 500
}) {
  const textareaRef = useRef(null);
  const [comment, setComment] = useState("");
  const [commentOverLength, setCommentOverLength] = useState(false);

  const { userInfo: { token, firstName, lastName } } = useSelector((state) => state.user );
  const dispatch = useDispatch();

  function onTextareaChange() {
    const overLength = textareaRef.current.value.length > maxContentLen;
    setCommentOverLength(overLength);
    setDisableActionBtns(overLength);
    if (commentOverLength) textareaRef.current.focus();
    setComment(textareaRef.current.value);
  }

  function onTextareaBlur() {
    if (commentOverLength) textareaRef.current.focus();
  }

  function onSendBtnClick() {
    textareaRef.current.value = "";
    dispatch(addNewCommentAsync({
      product: productID,
      content: comment
    }, token));

  }

  return <div className="comments__create-item">
    <Avatar className="comments__create-item-avatar" name={`${firstName} ${lastName}`} size="50" round/>
    <div className="comments__create-content-wrap">
      <textarea
        className="comments__create-item-content"
        name="comment-content"
        id="comment-content"
        placeholder="Add a review…"
        ref={textareaRef}
        onBlur={onTextareaBlur}
        onChange={onTextareaChange}
      >
      </textarea>
      <span
        className={`comments__length-counter ${commentOverLength ? "comments__length-counter--overlength" : ""}`}
      >
        {textareaRef.current ? textareaRef.current.value.length : 0}/{maxContentLen}
      </span>
    </div>
    <button
      disabled={comment === "" || commentOverLength || disableActionBtns}
      type="button"
      className="button comments__send-btn"
      onClick={onSendBtnClick}
    >
      Send
    </button>
  </div>;
}