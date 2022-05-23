import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import QuestionApi from "../api/QuestionApi";
import ActivityIndicator from "./extras/ActivityIndicator";
import AnswerForm from "./forms/AnswerForm";
import AnswerCard from "./cards/AnswerCard";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Question = ({ route }) => {
  const navigation = useNavigation();
  const [myquestion, setQuestion] = useState({});
  const { id: postsId } = route.params.item;
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let cleanup = false;
    const fetchQuestion = async (id) => {
      try {
        const myQuestion = await QuestionApi.getQuestionById(id);
        setQuestion(myQuestion);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestion(postsId);
    return () => (cleanup = true);
  }, [myquestion]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator visible={true} />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{myquestion.question.title}</Text>
          <Text style={styles.title}>Answers</Text>
          <View style={styles.contentContainer}>
            {myquestion.answers.map((item) => (
              <AnswerCard
                onPress={() => navigation.navigate("Answer", { item })}
                item={item}
                key={item.id}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ScrollView>
          <View style={styles.centeredView}>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <AnswerForm questionid={myquestion.question.id} />
          </View>
        </ScrollView>
      </Modal>

      <View style={{ position: "absolute", ...styles.button }}>
        <Pressable
          style={[styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome5 name="plus" size={30} color="#fff" />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: width,
    height: height / 2,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 5,
    backgroundColor: "#dff9fb",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0080ff",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    backgroundColor: "#fff",
    height: height,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Question;
