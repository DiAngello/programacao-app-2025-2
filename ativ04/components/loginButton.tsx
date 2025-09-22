import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";

type LoginButtonProps = {
  text: string;
  backgroundColor: string;
  textColor: string;
  icon?: keyof typeof Fontisto.glyphMap;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function LoginButton({
  text,
  backgroundColor,
  textColor,
  icon,
  onPress,
}: LoginButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <View style={styles.content}>
        {icon && <Fontisto name={icon} size={24} color={textColor} style={styles.icon} />}
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
