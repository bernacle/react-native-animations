import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";

const App = createStackNavigator();

const AppNavigator = () => {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Home" component={HomeScreen} />
      <App.Screen name="Section" component={SectionScreen} />
    </App.Navigator>
  );
};

export default AppNavigator;
