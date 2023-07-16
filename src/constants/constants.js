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
  }
};

export default notificationsSettings;