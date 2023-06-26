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
      setData(((constData / pressure - 1) * 1000000).toFixed(5));
    });
    Barometer.setUpdateInterval(5);
  }, 300);

  const kwadrat = function () {
    return {
      position: "absolute",
      width: 170,
      height: 80,
      backgroundColor:
        data * -1 > 150 ? (data * -1 > 500 ? "red" : "orange") : "green",
      color:
        data * -1 > 150
          ? (data * -1 > 500 ? "red" : "orange", Vibration.vibrate(33, false))
          : "green",
      bottom: 200,
      // marginBottom: move,
      zIndex: -1,
    };
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Siła nacisku</Text>
      <Text style={styles.text}>{data < 0 ? data * -1 : 0}g</Text>
      {/* <Text style={styles.text}>data: {data2}g</Text> */}
      {/* <Text style={styles.text}>constData: {constData}g</Text> */}
      <StatusBar style="auto" />
      <Animated.View style={kwadrat()}></Animated.View>
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
  text: { color: "white", fontSize: 30, fontWeight: "bold" },
});

export default Two;
