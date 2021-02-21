import axios from "axios";
import { useEffect, useState } from "react";
import { distance } from "../helpers/data";
import { beansEarned } from "../helpers/math";

export default function useApplicationData() {
  const [state, setState] = useState({
    user: [
      {
        id: 0,
        username: "Guest",
        current_beans: 0,
        lifetime_beans: 0,
        phone_number: null,
        tier: "Basic",
        type: "c",
        recentOrderBeansEarned: 0,
      },
    ],
    currentUser: 7,
    currentStore: 1,
    stores: [],
    menuItems: [],
    orders: [],
    myCoords: { latitude: 49.281338241296815, longitude: -123.11492992211487 },
  });

  //get location fn

  useEffect(() => {
    console.log("Running App Start effect");
    Promise.all([
      // getLocation(),
      axios.get("/api/stores"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          stores: distance(state.myCoords, all[0].data),
          // nearbyStores: getNearbyStores(state.stores)
        }));
      })
      .catch((err) =>
        console.log(
          `Error:\nStatus: ${err.response.status}\n${err.response.data}`
        )
      );
  }, []);

  useEffect(() => {
    console.log("Running user effect");
    Promise.all([
      axios.get(`/api/users/${state.currentUser}`),
      axios.get(`/api/orders/${state.currentUser}`),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          user: all[0].data,
          orders: all[1].data,
        }));
      })
      .catch((err) =>
        console.log(
          `Error:\nStatus: ${err.response.status}\n${err.response.data}`
        )
      );
  }, [state.currentUser]);

  useEffect(() => {
    console.log("Running menu effect");
    axios
      .get(`/api/menu/${state.currentStore}`)
      .then((result) => {
        setState((prev) => ({
          ...prev,
          menuItems: result.data,
        }));
      })
      .catch((err) =>
        console.log(
          `Error:\nStatus: ${err.response.status}\n${err.response.data}`
        )
      );
  }, [state.currentStore]);

  const setStore = (storeId) => {
    console.log("run setStore");

    setState((prev) => ({
      ...prev,
      currentStore: storeId,
    }));
  };

  const postOrder = (order) => {
    return axios({
      method: "post",
      url: "/api/order",
      data: order,
    })
      .then(() => {
        axios.get(`/api/orders/${state.currentUser}`).then((result) => {
          setState((prev) => ({ ...prev, orders: result.data }));
        });
      })
      .catch((err) => console.log(err.message));
  };

  const updateBeans = (id, newCurrentBeans, newLifetimeBeans, newTier, newAccelerator, beansEarned) => {
    return axios.put(`/api/users/${id}`, {
      current_beans: newCurrentBeans,
      lifetime_beans: newLifetimeBeans, 
      tier: newTier,
      accelerator: newAccelerator,

    })
    .then((response) => {
      setState((prev) => ({
        ...prev,
        user:[{...prev.user[0], current_beans: newCurrentBeans, lifetime_beans: newLifetimeBeans, accelerator: newAccelerator, tier: newTier, recentOrderBeansEarned: beansEarned}]
      }))
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return { state, setStore, postOrder, updateBeans };
}
