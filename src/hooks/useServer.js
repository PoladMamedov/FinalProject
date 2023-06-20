export default function useServer() {
  const url = "https://final-project-backend-phi.vercel.app/api";

  //* User registration/login
  async function registerUser(newUserData) {
    const savedCustomer = await fetch(`${url}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return savedCustomer;
  }

  async function loginUser(userData) {
    const loginResult = await fetch(`${url}/customers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return loginResult;
  }

  //* Getting all categories
  async function getCategories() {
    const categories = await fetch(`${url}/catalog`)
      .then((res) => res.json())
      .catch((err) => err);
    return categories;
  }

  //* Getting products
  async function getAllProducts() {
    const products = await fetch(`${url}/products`)
      .then((res) => res.json())
      .catch((err) => err);
    return products;
  }
  async function getProduct(itemNo) {
    const product = await fetch(`${url}/products/${itemNo}`)
      .then((res) => res.json())
      .catch((err) => err);
    return product;
  }

  //* Getting slides
  async function getSlides() {
    const slides = await fetch(`${url}/slides`)
      .then((res) => res.json())
      .catch((err) => err);
    return slides;
  }

  return {
    registerUser,
    loginUser,
    getCategories,
    getAllProducts,
    getProduct,
    getSlides,
  };
}