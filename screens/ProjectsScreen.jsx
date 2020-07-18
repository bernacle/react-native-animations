import React, { useState, useCallback, useRef } from "react";
import { View, PanResponder, Animated } from "react-native";
import styled from "styled-components";
import Project from "../components/Project";
import { projects } from "../utils/projects";

function getNextIndex(ind) {
  let nextIndex = ind + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

const ProjectsScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslateY = useRef(new Animated.Value(-50)).current;
  const [index, setIndex] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Here we animate the second card to the first card initial state
        Animated.spring(scale, { toValue: 1 }).start();
        Animated.spring(translateY, { toValue: 0 }).start();
        Animated.spring(thirdScale, { toValue: 0.9 }).start();
        Animated.spring(thirdTranslateY, { toValue: 44 }).start();
      },

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
          }).start(() => {
            pan.setValue(new Animated.ValueXY());
            scale.setValue(0.9);
            translateY.setValue(44);
            thirdScale.setValue(0.8);
            thirdTranslateY.setValue(-50);
            setIndex(index => getNextIndex(index));
          });
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
          Animated.spring(scale, { toValue: 0.9 }).start();
          Animated.spring(translateY, { toValue: 44 }).start();
          Animated.spring(thirdScale, { toValue: 0.8 }).start();
          Animated.spring(thirdTranslateY, { toValue: -50 }).start();
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
          title={projects[index].title}
          image={projects[index].image}
          author={projects[index].author}
          text={projects[index].text}
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
          title={projects[getNextIndex(index)].title}
          image={projects[getNextIndex(index)].image}
          author={projects[getNextIndex(index)].author}
          text={projects[getNextIndex(index)].text}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -2,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }],
        }}
      >
        <Project
          title={projects[getNextIndex(index + 1)].title}
          image={projects[getNextIndex(index + 1)].image}
          author={projects[getNextIndex(index + 1)].author}
          text={projects[getNextIndex(index + 1)].text}
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
