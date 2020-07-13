import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Text,
} from "react-native";
import styled from "styled-components";
import avatarImg from "../assets/avatar.jpg";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import Course from "../components/Course";
import Logo from "../components/Logo";
import { NotificationIcon } from "../components/Icons";
import { logos } from "../utils/logos";
import { cards } from "../utils/cards";
import { courses } from "../utils/courses";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
  }
`;

import Menu from "../components/Menu";
import { useQuery } from "@apollo/react-hooks";

const HomeScreen = () => {
  const [scale, setScale] = useState(new Animated.Value(1));
  const [opacity, setOpacity] = useState(new Animated.Value(1));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const action = useSelector(state => state.action);
  const name = useSelector(state => state.name);
  const { loading, error, data } = useQuery(CardsQuery);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
    toggleMenu();
  }, [action]);

  const openMenu = () => {
    dispatch({
      type: "OPEN_MENU",
    });
  };

  const toggleMenu = () => {
    if (action == "openMenu") {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: true,
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: true,
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (action == "closeMenu") {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: true,
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };

  return (
    <RootView>
      <Menu />
      <AnimatedContainer
        style={{ transform: [{ scale: scale }], opacity: opacity }}
      >
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <TitleBar>
              <TouchableOpacity
                onPress={openMenu}
                style={{ position: "absolute", top: 0, left: 20 }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back</Title>
              <Name>{name}</Name>
              <NotificationIcon
                style={{ position: "absolute", top: 5, right: 20 }}
              />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {logos.map((logo, index) => (
                <Logo key={index} image={logo.image} text={logo.text} />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {loading && <Message>Loading</Message>}
              {error && <Message>Error</Message>}
              {data && (
                <CardsContainer>
                  {data.cardsCollection.items.map((card, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate("Section", {
                          section: card,
                        });
                      }}
                    >
                      <Card
                        title={card.title}
                        image={{ uri: card.image.url }}
                        caption={card.caption}
                        logo={{ uri: card.logo.url }}
                        subtitle={card.subtitle}
                      />
                    </TouchableOpacity>
                  ))}
                </CardsContainer>
              )}
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            {courses.map((course, index) => (
              <Course
                key={index}
                image={course.image}
                title={course.title}
                subtitle={course.subtitle}
                logo={course.logo}
                author={course.author}
                avatar={course.avatar}
                caption={course.caption}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
};

export default HomeScreen;

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  background: #f0f3f5;
  flex: 1;
  justify-content: center;
  border-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 50px;
  text-transform: uppercase;
`;
const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
`;
