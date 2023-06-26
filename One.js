import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Barometer } from "expo-sensors";
const One = () => {
  const [constData, setConstData] = useState();
  const [data, setData] = useState(20);

  const move = useRef(new Animated.Value(0)).current;

  const fade = (value, duration, useref) => {
    Animated.timing(useref, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
    }).start();
  };

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
      setData(((pressure - constData) * 25 * -70 + 100).toFixed(0));
      // setConstData(pressure);
    });
    Barometer.addListener(({ pressure, relativeAltitude }) => {
      // setConstData(pressure);
      fade(data < 20 ? data : 20, 200, move);
    });
    Barometer.setUpdateInterval(5);
  }, 300);

  const kwadrat = function () {
    return {
      position: "absolute",
      width: "100%",
      height: 5000,
      backgroundColor: "#121212",
      bottom: -4950,
      transform: [{ translateY: move }],
      // marginBottom: move,
      zIndex: -1,
    };
  };
  const kwadrat2 = function () {
    return {
      position: "absolute",
      width: "10%",
      height: 5000,
      right: 20,
      backgroundColor:
        data * -1 > 1000 ? "red" : data * -1 > 500 ? "yellow" : "green",
      bottom: -4950,
      transform: [{ translateY: move }],
      // marginBottom: move,
      zIndex: -1,
    };
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Siła nacisku</Text>
      <Text style={styles.text}>{data < 0 ? data * -1 : 0}g</Text>
      {/* <Text style={styles.text}>{data}g</Text> */}
      {/* <Text style={styles.text}>constData: {constData}g</Text> */}
      <StatusBar style="auto" />
      <Animated.View style={kwadrat()}></Animated.View>
      <Animated.View style={kwadrat2()}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "white", fontSize: 30, fontWeight: "bold" },
});

export default One;
