/* eslint-disable no-else-return */
/* eslint-disable object-curly-newline */
export default function createOrder({ customerId, products, deliveryAddress, email, mobile, delivery }) {
  if (customerId) {
    const order = {
      customerId,
      deliveryAddress,
      email,
      mobile,
      shipping: delivery ? "Nova Poshta delivery" : "Store pickup",
      letterSubject: "Thank you for order! You are welcome!",
      letterHtml: delivery
        ? "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be shipped to you as fast as possible! If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>"
        : "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be waiting for you in our store, reservation period is 3 days. If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>",
    };
    return order;
  } else {
    const order = {
      products,
      deliveryAddress,
      email,
      mobile,
      shipping: delivery ? "Nova Poshta delivery" : "Store pickup",
      letterSubject: "Thank you for order! You are welcome!",
      letterHtml: delivery
        ? "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be shipped to you as fast as possible! If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>"
        : "<h1>Your order is placed. Thank you for choosing Innovation Oasis</h1><p>Your order will be waiting for you in our store, reservation period is 3 days. If you have any questions please <a href='https://final-project-mauve-seven.vercel.app/about'>contact us</a></p>",
    };
    return order;
  }
}
