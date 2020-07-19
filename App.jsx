import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
import TabNavigator from "./navigator/TabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx",
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840`,
  },
});

const initialState = {
  action: "",
  name: "",
};
const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    case "OPEN_CARD":
      return { action: "openCard" };
    case "CLOSE_CARD":
      return { action: "closeCard" };
    default:
      return state;
  }
};

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(reducer);

//const store = createStore(reducer);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Provider store={store}>
          <TabNavigator />
        </Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
