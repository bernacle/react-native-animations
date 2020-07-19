import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import * as Icon from "@expo/vector-icons";

const Project = props => {
  const dispatch = useDispatch();
  const cardWidth = useRef(new Animated.Value(315)).current;
  const cardHeight = useRef(new Animated.Value(460)).current;
  const titleTop = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textHeight = useRef(new Animated.Value(100)).current;
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const tabBarHeight = 78;

  const openCard = () => {
    if (!props.canOpen) return;

    Animated.spring(cardWidth, { toValue: screenWidth }).start();
    Animated.spring(cardHeight, {
      toValue: screenHeight - tabBarHeight,
    }).start();
    Animated.spring(titleTop, { toValue: 40 }).start();
    Animated.timing(opacity, { toValue: 1 }).start();
    StatusBar.setHidden(true);
    Animated.spring(textHeight, {
      toValue: 1000,
    }).start();
    dispatch({
      type: "OPEN_CARD",
    });
  };
  const closeCard = () => {
    Animated.spring(cardWidth, { toValue: 315 }).start();
    Animated.spring(cardHeight, { toValue: 460 }).start();
    Animated.spring(titleTop, { toValue: 20 }).start();
    Animated.timing(opacity, { toValue: 0 }).start();
    StatusBar.setHidden(false);
    Animated.spring(textHeight, {
      toValue: 100,
    }).start();
    dispatch({
      type: "CLOSE_CARD",
    });
  };

  return (
    <TouchableWithoutFeedback onPress={openCard}>
      <AnimatedContainer style={{ width: cardWidth, height: cardHeight }}>
        <Cover>
          <Image source={props.image} />
          <AnimatedTitle style={{ top: titleTop }}>{props.title}</AnimatedTitle>
          <Author>by {props.author}</Author>
        </Cover>

        <AnimatedText style={{ height: textHeight }}>{props.text}</AnimatedText>
        <AnimatedLinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          style={{
            position: "absolute",
            top: 330,
            width: "100%",
            height: textHeight,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            right: 20,
          }}
          onPress={closeCard}
        >
          <AnimatedCloseView style={{ opacity: opacity }}>
            <Icon.Ionicons name="ios-close" size={32} color="#546bfb" />
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

export default Project;

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimatedText = Animated.createAnimatedComponent(Text);

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
