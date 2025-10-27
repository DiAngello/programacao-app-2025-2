import { Stack } from 'expo-router';

export default function SettingsStackLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Configurações' }}
      />
      <Stack.Screen 
        name="settings-options" 
        options={{ title: 'Opções Avançadas' }} 
      />
    </Stack>
  );
}