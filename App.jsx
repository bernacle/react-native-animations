import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
import TabNavigator from "./navigator/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

const initialState = {
  action: "",
  name: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    </NavigationContainer>
  );
}
