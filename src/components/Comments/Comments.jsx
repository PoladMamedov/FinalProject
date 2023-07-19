import React from "react";
import CommentsItem from "../CommentsItem/CommentsItem";


const mockData = [
  {
    _id: "5d90e8fcea6f09306470adb9",
    customer: {
      isAdmin: false,
      enabled: true,
      _id: "5d63a92afc004f2e041179cd",
      firstName: "Ira",
      lastName: "Kalen",
      login: "test12",
      email: "test3@gmail.com",
      password: "$2a$10$Tfnzth419TINXXQB8pjiYevZCeKdDZmlL1o43k3guhnmiLgMcUkwG",
      date: "2019-08-26T09:40:58.667Z",
      __v: 0
    },
    product: {
      enabled: true,
      imageUrls: ["products/itemNo2"],
      quantity: 40,
      _id: "5d73adb9fcad90130470f08f",
      name: "test product 5",
      currentPrice: 400,
      categories: "computers",
      someOtherFeature: "test5",
      color: "green",
      size: "xl",
      ram: "600",
      weight: "1800g",
      itemNo: "563877",
      __v: 0,
      date: "2019-10-22T17:05:21.426Z"
    },
    content: "Comment's content 1",
    __v: 0
  },
  {
    _id: "5d90e9e9ea6f09306470adbb",
    customer: {
      isAdmin: false,
      enabled: true,
      _id: "5d63a92afc004f2e041179cd",
      firstName: "Polad",
      lastName: "Mamedov",
      login: "test12",
      email: "test3@gmail.com",
      password: "$2a$10$Tfnzth419TINXXQB8pjiYevZCeKdDZmlL1o43k3guhnmiLgMcUkwG",
      date: "2019-08-26T09:40:58.667Z",
      __v: 0
    },
    product: {
      enabled: true,
      imageUrls: ["products/itemNo2"],
      quantity: 40,
      _id: "5d73adb9fcad90130470f08f",
      name: "test product 5",
      currentPrice: 400,
      categories: "computers",
      someOtherFeature: "test5",
      color: "green",
      size: "xl",
      ram: "600",
      weight: "1800g",
      itemNo: "563877",
      __v: 0,
      date: "2019-10-22T17:05:21.426Z"
    },
    content: "Comment's content 2",
    __v: 0
  }
];

export default function Comments() {

  return <section className="comments">
    <h1 className="comments__title">Comments</h1>
    <ul className="comments__list">
      {mockData.map(({customer: {firstName, lastName, date}, content}, index) => <li key={index} className="comments__item"><CommentsItem firstName={firstName} lastName={lastName} content={content} date={date}/></li>)}
    </ul>
  </section>;
}