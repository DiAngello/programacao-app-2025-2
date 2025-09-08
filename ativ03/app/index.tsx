import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginButton from "../components/loginButton";
import InputField from "../components/inputField";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <InputField
        label="E-mail"
        placeholder="Enter your e-mail"
        value={email}
        onChangeText={validateEmail}
        helperText={
          isEmailValid
            ? "Please enter a valid email, e.g.: user@example.com"
            : "❌ Invalid email format"
        }
        keyboardType="email-address"
      />

      <InputField
        label="Password"
        placeholder="Enter your password"
        helperText="Enter your password."
        secureTextEntry
      />

      <LoginButton
        text="Login with E-mail"
        backgroundColor={isEmailValid && email ? "black" : "#ccc"}
        textColor="white"
        icon="email"
        onPress={() => {
          if (isEmailValid && email) {
            router.push(`/successScreen?email=${encodeURIComponent(email)}`);
          }
        }}
      />

      <LoginButton
        text="Login with Facebook"
        backgroundColor="#1877F2"
        textColor="white"
        icon="facebook"
        onPress={() =>
          router.push({ pathname: "/successScreen", params: { email: "Facebook User" } })
        }
      />

      <LoginButton
        text="Login with Google"
        backgroundColor="#DB4437"
        textColor="white"
        icon="google"
        onPress={() =>
          router.push({ pathname: "/successScreen", params: { email: "Google User" } })
        }
      />

      <Text style={styles.footerText}>
        Don’t have an account? <Text style={styles.signUp}>Sign up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  footerText: { marginTop: 24, textAlign: "center", fontSize: 14, color: "#555" },
  signUp: { color: "#1877F2", fontWeight: "bold" },
});
