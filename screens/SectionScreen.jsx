import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
import * as Icon from "@expo/vector-icons";
import WebView from "react-native-webview";
import Markdown from "react-native-showdown";

const SectionScreen = () => {
  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const route = useRoute();
  const { section } = route.params;

  const closeModal = () => {
    navigation.goBack();
    StatusBar.setBarStyle("dark-content", true);
  };

  return (
    <Container>
      <StatusBar hidden />
      <Cover>
        <Image source={{ uri: section.image.url }} />
        <Wrapper>
          <Logo source={{ uri: section.logo.url }} />
          <Subtitle>{section.subtitle}</Subtitle>
        </Wrapper>
        <Title>{section.title}</Title>
        <Caption>{section.caption}</Caption>
      </Cover>

      <TouchableOpacity
        onPress={closeModal}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <CloseView>
          <Icon.Ionicons
            name="ios-close"
            size={36}
            style={{ marginTop: -2 }}
            color="#4775f2"
          />
        </CloseView>
      </TouchableOpacity>
      <ScrollView>
        <Content>
          {/* <WebView
          source={{ html: section.content + htmlStyles }}
          scalesPageToFit={false}
          scrollEnabled={false}
          ref={webViewRef}
          onNavigationStateChange={event => {
            if (event.url != "about:blank") {
              webViewRef.current.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        /> */}
          <Markdown
            body={section.content}
            pureCSS={htmlStyles}
            scalesPageToFit={false}
            scrollEnabled={false}
          />
        </Content>
      </ScrollView>
    </Container>
  );
};

export default SectionScreen;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  background: white;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background: #3c4560;
`;

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17;
  position: absolute;
  bottom: 20px;
  left: 20px;
  max-width: 300px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const Content = styled.View`
  height: 1000;
  padding: 12px;
`;

const htmlContent = `
<h2>This is a title</h2>
<p>This <strong>is</strong> a <a href="http://designcode.io">link</a></p>
<img src="https://cl.ly/8861f359ed6d/download/Wave14.jpg" />
`;

const htmlStyles = `
<style>
* {
  font-family: -apple-system;
      margin: 0;
      padding: 0;
}

img {
  width: 100%;
  margin-top: 20px;
    border-radius: 10px;
}
pre {
  padding: 20px;
  background: #212C4F;
  overflow: hidden;
  word-wrap: break-word;
  border-radius: 10px;
    margin-top: 20px;
}

code {
  color: white;
}

</style>
`;
