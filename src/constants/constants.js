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
    title: "Error!",
    message: "The product is already in the comparison list",
    type: "danger"
  }
};

export default notificationsSettings;