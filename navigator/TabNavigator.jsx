import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SectionScreen from "../screens/SectionScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import * as Icon from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Home = createStackNavigator();
const Stack = createStackNavigator();
const Courses = createStackNavigator();
const Projects = createStackNavigator();
const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeRoutes = () => (
  <Home.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Home.Screen name="Home" component={HomeScreen} />
  </Home.Navigator>
);
const CoursesRoutes = () => (
  <Courses.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Courses.Screen name="Courses" component={CoursesScreen} />
  </Courses.Navigator>
);
const ProjectsRoutes = () => (
  <Projects.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Projects.Screen name="Projects" component={ProjectsScreen} />
  </Projects.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeTabs" component={TabNavigator} />
    <Stack.Screen name="Section" component={SectionScreen} />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: activeColor,
        inactiveTintColor: inactiveColor,
      }}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Courses") {
            iconName = "ios-albums";
          } else {
            iconName = "ios-folder";
          }

          return (
            <Icon.Ionicons
              name={iconName}
              size={26}
              color={focused ? activeColor : inactiveColor}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeRoutes} />
      <Tab.Screen name="Courses" component={CoursesRoutes} />
      <Tab.Screen name="Projects" component={ProjectsRoutes} />
    </Tab.Navigator>
  );
};

export default StackNavigator;
