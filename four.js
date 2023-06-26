import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Animated, Vibration } from "react-native";
import { Barometer } from "expo-sensors";
const Two = () => {
  const [constData, setConstData] = useState();
  const [data, setData] = useState(20);
  const [data2, setData2] = useState(20);

  // const move = useRef(new Animated.Value(0)).current;

  // const fade = (value, duration, useref) => {
  //   Animated.timing(useref, {
  //     toValue: value,
  //     duration: duration,
  //     useNativeDriver: false,
  //   }).start();
  // };

  useEffect(() => {
    Barometer.addListener(({ pressure, relativeAltitude }) => {
      setConstData(pressure);
    });
    setTimeout(() => {
      Barometer.removeAllListeners();
    }, 50);
  }, []);

  setTimeout(() => {
    Barometer.addListener(({ pressure, relativeAltitude }) => {
      setData(((constData / pressure - 1) * 3000000).toFixed(1));
    });
    Barometer.setUpdateInterval(5);
  }, 300);

  const kwadrat = function () {
    return {
      position: "absolute",
      width: 350,
      height: 350,
      borderRadius: 500,
      backgroundColor:
        data * -1 > 150 ? (data * -1 > 500 ? "red" : "orange") : "green",
      color:
        data * -1 > 150
          ? (data * -1 > 500 ? "red" : "orange", Vibration.vibrate(33, false))
          : "green",
      bottom: 320,
      // marginBottom: move,
      zIndex: -1,
    };
  };

  return (
    <View style={styles.container}>
      <Animated.View style={kwadrat()}></Animated.View>
      <View style={styles.kwadrat2}>
        <Text style={styles.text2}>
          ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        </Text>
      </View>
      <Text style={styles.text0}>WAGA</Text>

      <Text style={styles.text1}>Siła nacisku</Text>
      <Text style={styles.text}>{data < 0 ? data * -1 : 0}g</Text>

      {/* <Text style={styles.text}>data: {data2}g</Text> */}
      {/* <Text style={styles.text}>constData: {constData}g</Text> */}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  text0: {
    color: "#333",
    fontSize: 50,
    top: -280,
    letterSpacing: 5,
    fontWeight: "bold",
  },
  text2: {
    color: "#161616",
    fontSize: 50,
    // top: 20,
    letterSpacing: -5,
    fontWeight: "bold",
  },
  text1: { color: "#888", fontSize: 30, top: 300 },
  text: { color: "white", fontSize: 50, fontWeight: "bold", top: 320 },
  kwadrat2: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 500,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    bottom: 325,
    // marginBottom: move,
    overflow: "hidden",
    zIndex: -1,
  },
});

export default Two;
