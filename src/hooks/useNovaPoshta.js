export default function useNovaPoshta() {
  const url = "https://api.novaposhta.ua/v2.0/json/";
  const apiKey = "ee8e27eb002224312949606ff16f7347";
  //   async function getAllCities() {
  //     const cities = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         apiKey,
  //         modelName: "Address",
  //         calledMethod: "getCities",
  //         methodProperties: {},
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .catch((err) => err);
  //     return cities;
  //   }
  async function findCity(search) {
    const cities = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          FindByString: search,
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return cities.data;
  }
  //   async function getAllWarehouses() {
  //     const warehouses = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         apiKey: "",
  //         modelName: "Address",
  //         calledMethod: "getWarehouses",
  //         methodProperties: {
  //           TypeOfWarehouseRef: "841339c7-591a-42e2-8233-7a0a00f0ed6f",
  //         },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .catch((err) => err);
  //     return warehouses;
  //   }
  async function findWarehouse(warehouseNo, cityName) {
    const warehouses = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: "",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          // TypeOfWarehouseRef: "841339c7-591a-42e2-8233-7a0a00f0ed6f",
          CityName: cityName,
          WarehouseId: warehouseNo,
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return warehouses.data;
  }

  return {
    // getAllCities,
    findCity,
    // getAllWarehouses,
    findWarehouse,
  };
}
