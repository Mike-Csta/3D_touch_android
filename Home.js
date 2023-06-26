import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight,
} from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.btn}
        onPress={() => navigation.navigate("One")}
      >
        <Text style={styles.text}>One</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.btn}
        onPress={() => navigation.navigate("Two")}
      >
        <Text style={styles.text}>Two</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.btn}
        onPress={() => navigation.navigate("Three")}
      >
        <Text style={styles.text}>Three</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.btn}
        onPress={() => navigation.navigate("four")}
      >
        <Text style={styles.text}>Four</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    // backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  btn: { backgroundColor: "#aaa", flex: 1, margin: 20, width: "50%" },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Home;
