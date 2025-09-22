import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="successScreen"
        options={{
          title: "Sucesso",
          headerBackVisible: true, 
        }}
      />
    </Stack>
  );
}
