import React from "react";
import Avatar from "react-avatar";

export default function CommentsItem({
firstName, lastName, date, content
}) {

  return <>
    <div className="comments__item-header">
      <Avatar className="comments__item-avatar" name={`${firstName} ${lastName}`} size="50" round/>
      <p className="comments__item-name">{firstName} {lastName}</p>
      <span className="comments__item-date">
        {new Date(date).toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
       })}
      </span>
    </div>
    <p className="comments__item-content">{content}</p>
  </>;
}