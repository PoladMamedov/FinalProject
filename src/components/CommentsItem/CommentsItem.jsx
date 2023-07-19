import React from "react";

export default function CommentsItem({
firstName, lastName, date, content
}) {

  return <>
    <div className="comments__item-header">
      <h3 className="comments__item-title">{firstName} {lastName}</h3>
       <p className="comments__item-date">{new Date(date).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
       })}</p>
    </div>
    <p className="comments__item-content">{content}</p>
  </>;
}