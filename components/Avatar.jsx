import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const Avatar = props => {
  const [photo, setPhoto] = useState("https://i.stack.imgur.com/l60Hf.png");
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://uifaces.co/api?limit=1&random", {
      headers: new Headers({
        "X-API-KEY": "3b7b69643503b023c36ecbd89c2ff2",
      }),
    })
      .then(response => response.json())
      .then(res => {
        const [obj] = res;
        setPhoto(obj.photo);
        dispatch({
          type: "UPDATE_NAME",
          name: obj.name,
        });
      })
      .catch(err => console.log(err));
  }, []);

  return <Image source={{ uri: photo }} />;
};

export default Avatar;

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
