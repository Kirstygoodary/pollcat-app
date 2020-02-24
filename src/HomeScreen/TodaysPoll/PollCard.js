import React, { Component } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  Dimensions
} from "react-native";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Text,
  Form,
  Item,
  Input,
  Label,
  Left,
  Right,
  Body,
  Title,
  Button,
  H1,
  Spinner,
  Card,
  CardItem
} from "native-base";
import AnswerButtons from "./AnswerButtons";

const height = (Dimensions.get("window").width / 800) * 500;

const PollCard = ({ questionData }) => {
  console.log(questionData);
  const {
    img,
    question,
    answerArray,
    questionStatus,
    startTime
  } = questionData;
  return (
    <Card>
      <CardItem>
        <Body>
          <H1>{question}</H1>
        </Body>
      </CardItem>
      <CardItem cardBody>
        <Image source={{ uri: img }} style={{ height: height, flex: 1 }} />
      </CardItem>
      {questionStatus === "current" &&
        answerArray.map((answerData, index) => {
          return <AnswerButtons key={index} answerData={answerData} />;
        })}
    </Card>
  );
};

export default PollCard;
