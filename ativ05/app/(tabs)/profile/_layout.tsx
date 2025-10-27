import { Stack } from 'expo-router'; 

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Meu Perfil' }}
      />
      <Stack.Screen 
        name="edit-profile" 
        options={{ title: 'Editar Perfil' }} 
      />
    </Stack>
  );
}