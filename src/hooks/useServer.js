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

  async function getUser(token) {
    const user = await fetch(`${url}/customers/customer`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
    return user;
  }

  //* Getting all categories
  async function getCategories() {
    const categories = await fetch(`${url}/catalog`)
      .then((res) => res.json())
      .catch((err) => err);
    return categories;
  }

  async function getPartners() {
    const categories = await fetch(`${url}/partners`)
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

  // Get filters
  async function getFilters() {
    const filters = await fetch(`${url}/filters`)
      .then((res) => res.json())
      .catch((err) => err);
    return filters;
  }

  // Get filters categories
 async function getFiltersCategories(categories) {
  const filteredProducts = await fetch(`${url}/products/filter?categories=${categories.join(
      ","
      )}`)
      .then((res) => res.json())
      .catch((err) => err);
      return filteredProducts;
 }

 // Get filters categories+price
 async function getFiltersCategoriesPrices(categories, min, max) {
  const filteredProducts = await fetch(`${url}/products/filter?categories=${categories.join(
      ","
      )}&minPrice=${min}&maxPrice=${max}`)
      .then((res) => res.json())
      .catch((err) => err);
      return filteredProducts;
 }

 // Get filters prices
 async function getFiltersPrices(min, max) {
  const filteredProducts = await fetch(`${url}/products/filter?minPrice=${min}&maxPrice=${max}`)
      .then((res) => res.json())
      .catch((err) => err);
      return filteredProducts;
 }

  return {
    registerUser,
    loginUser,
    getUser,
    getCategories,
    getPartners,
    getAllProducts,
    getProduct,
    getSlides,
    getFilters,
    getFiltersCategories,
    getFiltersCategoriesPrices,
    getFiltersPrices
  };
}
