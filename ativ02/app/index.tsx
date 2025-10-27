import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Quadrante Superior Esquerdo */}
      <View style={[styles.box, { backgroundColor: "#FF342F" }]}>
        <Feather name="play-circle" size={32} color="black" />
        <Text style={styles.text}>play</Text>
      </View>

      {/* Quadrante Superior Direito */}
      <View style={[styles.box, { backgroundColor: "#FF8A26" }]}>
        <Feather name="pause-circle" size={32} color="black" />
        <Text style={styles.text}>pause</Text>
      </View>

      {/* Quadrante Inferior Esquerdo */}
      <View style={[styles.box, { backgroundColor: "#00BF59" }]}>
        <Feather name="stop-circle" size={32} color="black" />
        <Text style={styles.text}>stop</Text>
      </View>

      {/* Quadrante Inferior Direito */}
      <View style={[styles.box, { backgroundColor: "#FFC432" }]}>
        <Feather name="arrow-right-circle" size={32} color="black" />
        <Text style={styles.text}>arrow</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  box: {
    width: "50%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "black",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold"
  }
});
