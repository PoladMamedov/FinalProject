import React, { useRef, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAsync, editCommentAsync } from "../../redux/actions/comments";

export default function CommentsItem({
 _id: commentID,
 customer: {
  firstName, lastName, date, _id: customerID
 },
 content,
 maxContentLen = 500
}) {
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(content);
  const [commentOverLength, setCommentOverLength] = useState(content.length > maxContentLen);

  const dispatch = useDispatch();
  const  {userInfo: {token, _id: userID}} = useSelector((state) => state.user);
  const editTextareaRef = useRef(null);

  function onConfirmBtnClick() {
    if (commentOverLength) {
      editTextareaRef.current.focus();
    } else if (content !== editedComment) {
      dispatch(editCommentAsync(commentID, { content: editedComment }, token));
      setEditMode(false);
    } else {
      setEditMode(false);
    }
  }

  return <>
    <div className="comments__item-header">
      <Avatar className="comments__item-avatar" name={`${firstName} ${lastName}`} size="50" round/>
      <p className="comments__item-name">{firstName} {lastName}</p>
      {userID === customerID ? <span className="comments__active-user">you</span> : null}
      <span className="comments__item-date">
        {new Date(date).toLocaleString("en-UA", {
          day: "numeric",
          month: "short",
          year: "numeric",
       })}
      </span>
    </div>
    {editMode
      ? <div className="comments__create-content-wrap">
        <textarea
          className="comments__edited-comment"
          name="comment-content--edited"
          id="comment-content--edited"
          ref={editTextareaRef}
          onChange={() => {
            setCommentOverLength(editTextareaRef.current.value.length > maxContentLen);
            setEditedComment(editTextareaRef.current.value);
          }}
          onBlur={onConfirmBtnClick}
          value={editedComment}
        ></textarea>
        <span
          className={`comments__length-counter ${commentOverLength ? "comments__length-counter--overlength" : ""}`}
        >
        {editTextareaRef.current ? editTextareaRef.current.value.length : content.length}/{maxContentLen}
      </span>
      </div>
      : <p className="comments__item-content">{content}</p>}
    {userID === customerID && !editMode
      ? <div className="comments__actions">
        <button
          type="button"
          className="button comments__action-btn"
          onClick={() => dispatch(deleteCommentAsync(commentID, token))}
        >
          Delete
        </button>
        <button
          type="button"
          className="button comments__action-btn"
          onClick={() => {
            setEditMode(true);
            setTimeout(() => editTextareaRef.current.focus(), 10);
          }}
        >
          Edit
        </button>
      </div> : null}
  </>;
}