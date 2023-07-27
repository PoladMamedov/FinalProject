const newOrderLoggedPickup = {
  customerId: "5d99ce196d40fb1b747bc5f5", //! if logged in
  deliveryAddress: {
    city: "Kiev",
    address: "Kreshchatic Street 56//A",
  },
  shipping: "Store pickup",
  email: "saribeg@gmail.com",
  mobile: "+380630000000",
  letterSubject: "Thank you for order! You are welcome!",
  letterHtml:
    "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be waiting for you in our store, reservation period is 3 days. If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>",
};

const newOrderNonLoggedPickup = {
  products: [
    //! only if not logged in
  ],
  deliveryAddress: {
    city: "Kiev",
    address: "Kreshchatic Street 56//A",
  },
  shipping: "Store pickup",
  email: "saribeg@gmail.com",
  mobile: "+380630000000",
  letterSubject: "Thank you for order! You are welcome!",
  letterHtml:
    "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be waiting for you in our store, reservation period is 3 days. If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>",
};

const newOrderLoggedNP = {
  customerId: "5d99ce196d40fb1b747bc5f5", //! if logged in
  deliveryAddress: {
    city: "Kiev",
    address: "Kreshchatic Street 56//A",
  },
  shipping: "Nova Poshta delivery",
  email: "saribeg@gmail.com",
  mobile: "+380630000000",
  letterSubject: "Thank you for order! You are welcome!",
  letterHtml:
    "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be shipped to you as fast as possible! If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>",
};

const newOrderNonLoggedNP = {
  products: [
    //! only if not logged in
  ],
  deliveryAddress: {
    city: "Kiev",
    address: "Kreshchatic Street 56//A",
  },
  shipping: "Nova Poshta delivery",
  email: "saribeg@gmail.com",
  mobile: "+380630000000",
  letterSubject: "Thank you for order! You are welcome!",
  letterHtml:
    "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be shipped to you as fast as possible! If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>",
};
