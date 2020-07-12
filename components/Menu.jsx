import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import * as Icon from "@expo/vector-icons";
import { items } from "../utils/menu-item";
import MenuItem from "../components/MenuItem";

const Menu = () => {
  const screenHeight = Dimensions.get("window").height;
  const [top, setTop] = useState(new Animated.Value(screenHeight));
  const action = useSelector(state => state.action);
  const dispatch = useDispatch();

  useEffect(() => {
    toggleMenu();
  }, [action]);

  const closeMenu = () => {
    dispatch({
      type: "CLOSE_MENU",
    });
  };

  const toggleMenu = () => {
    if (action == "openMenu") {
      Animated.spring(top, {
        toValue: 54,
      }).start();
    }
    if (action == "closeMenu") {
      Animated.spring(top, {
        toValue: screenHeight,
      }).start();
    }
  };

  return (
    <AnimatedContainer style={{ top: top }}>
      <Cover>
        <Image source={require("../assets/background2.jpg")} />
        <Title>Bruno Simplicio</Title>
        <Subtitle>Developer</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={closeMenu}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1,
        }}
      >
        <CloseView>
          <Icon.Ionicons name="ios-close" size={44} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content screenHeight={screenHeight}>
        {items.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            title={item.title}
            text={item.text}
          />
        ))}
      </Content>
    </AnimatedContainer>
  );
};

export default Menu;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-weight: 600;
  margin-top: 8px;
`;

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;
const Content = styled.View`
  height: ${props => props.screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;
