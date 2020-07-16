import React, { useState, useEffect, useRef } from "react";
import { View, PanResponder, Animated } from "react-native";
import styled from "styled-components";
import Project from "../components/Project";
import { projects } from "../utils/projects";

const ProjectsScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const panResponder = useRef(
    PanResponder.create({
      onPanResponderGrant: () => {
        // Here we animate the second card to the first card initial state
        Animated.spring(scale, { toValue: 1 }).start();
        Animated.spring(translateY, { toValue: 0 }).start();
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ]),
      onPanResponderRelease: () => {
        const positionY = pan.y._value;

        if (positionY > 200) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
          }).start();
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
          Animated.spring(scale, { toValue: 0.9 }).start();
          Animated.spring(translateY, { toValue: 44 }).start();
        }
      },
    }),
  ).current;

  return (
    <Container>
      <Animated.View
        style={{ transform: [{ translateX: pan.x }, { translateY: pan.y }] }}
        {...panResponder.panHandlers}
      >
        <Project
          title={projects[1].title}
          image={projects[1].image}
          author={projects[1].author}
          text={projects[1].text}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: scale }, { translateY: translateY }],
        }}
      >
        <Project
          title={projects[0].title}
          image={projects[0].image}
          author={projects[0].author}
          text={projects[0].text}
        />
      </Animated.View>
    </Container>
  );
};

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
`;

const Text = styled.Text``;
