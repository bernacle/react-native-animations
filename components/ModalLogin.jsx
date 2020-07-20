import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import PasswordIcon from "../components/PasswordIcon";
import EmailIcon from "../components/EmailIcon";

const ModalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <Container>
      <Modal>
        <Logo source={require("../assets/icon.png")}></Logo>
        <Text>Start Learning. Access Pro Content</Text>
        <TextInput
          onChangeText={email => setEmail(email)}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
        />
        <EmailIcon
          style={{
            position: "absolute",
            top: 179,
            left: 31,
          }}
        />
        <TextInput
          onChangeText={password => setPassword(password)}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
        />
        <PasswordIcon
          style={{
            position: "absolute",
            top: 239,
            left: 35,
          }}
        />
        <TouchableOpacity onPress={handleLogin}>
          <ButtonView>
            <ButtonText>Log in</ButtonText>
          </ButtonView>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

export default ModalLogin;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 20px;
`;

const Modal = styled.View`
  width: 335px;
  height: 370px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;

const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;
