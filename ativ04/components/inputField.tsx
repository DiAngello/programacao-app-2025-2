import React from "react";
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";

type InputFieldProps = {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  helperText?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  helperText,
  secureTextEntry = false,
  keyboardType = "default",
}: InputFieldProps) {
  return (
     <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value} 
        onChangeText={onChangeText} 
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 4,
  },
  helperText: {
    fontSize: 12,
    color: "#888",
  },
});
