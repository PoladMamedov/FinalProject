const notificationsSettings = {
  basic: {
    insert: "bottom",
    container: "bottom-left",
    dismiss: {
      duration: 5000,
      showIcon: true
    }
  },
  addedToCart: {
    title: "Success!",
    message: "Product added to cart",
    type: "success",
  },
  error: {
    title: "Error!",
    type: "danger",
  },
  addedToCompare: {
    title: "Success!",
    message: "Product added to compare list",
    type: "success",
  },
  errorCompare: {
    title: "Attn!",
    message: "The product removed from comparison list",
    type: "danger"
  },
  errorReAddToCart: {
    title: "Attn!",
    message: "The product is already in the cart",
    type: "danger"
  }
};

export default notificationsSettings;