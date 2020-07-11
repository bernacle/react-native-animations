import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const Logo = props => {
  return (
    <Container>
      <Image source={props.image} resizeMode="contain" />
      <Text>{props.text}</Text>
    </Container>
  );
};

export default Logo;

const LogosWrapper = styled.View`
  flex-direction: row;
  padding: 20px 12px;
`;

const Container = styled.View`
  flex-direction: row;
  padding: 12px 16px 12px;
  height: 60px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  align-items: center;
  margin: 0 8px;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: 17px;
  margin-left: 8px;
`;
