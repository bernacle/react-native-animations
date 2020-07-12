import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components";
import avatarImg from "./assets/avatar.jpg";
import Card from "./components/Card";
import Course from "./components/Course";
import Logo from "./components/Logo";
import backgroundImage from "./assets/background2.jpg";
import logo from "./assets/logo-react.png";
import { NotificationIcon } from "./components/Icons";
import FramerX from "./assets/logo-framerx.png";
import Figma from "./assets/logo-figma.png";
import { logos } from "./utils/logos";
import { cards } from "./utils/cards";
import { courses } from "./utils/courses";

import Menu from "./components/Menu";

export default function App() {
  return (
    <Container>
      <Menu />
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <TitleBar>
            <Avatar source={avatarImg}></Avatar>
            <Title>Welcome back</Title>
            <Name>Bruno</Name>
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
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                image={card.image}
                caption={card.caption}
                logo={card.logo}
                subtitle={card.subtitle}
              />
            ))}
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
    </Container>
  );
}

const Container = styled.View`
  background: #f0f3f5;
  flex: 1;
  justify-content: center;
`;

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

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 50px;
  text-transform: uppercase;
`;
