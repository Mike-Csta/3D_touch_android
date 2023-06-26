import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    // Spróbuj zamienić 'pl' na 'pl-PL', jeśli to nie zadziała
  }, []);

  const startSpeaking = () => {
    while (isSpeaking) {
      Speech.speak(text);
    }
  };

  const stopSpeaking = () => {
    setIsSpeaking(false);
    Speech.stop();
  };

  const speak = () => {
    if (!isSpeaking) return;

    Speech.speak(text, {
      language: "pl",
      onDone: () => {
        if (isSpeaking) {
          speak();
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textarea}
        multiline
        onChangeText={setText}
        value={text}
      />
      <View style={styles.buttons}>
        <Button title="Start" onPress={startSpeaking} />
        <Button title="Stop" onPress={stopSpeaking} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textarea: {
    width: "80%",
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});
