import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const COLORS = {
  background: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#8A8A8E',
};

export default function HomeDetailsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Página de Detalhes</Text>
        <Text style={styles.subtitle}>
          Este é o conteúdo da tela de detalhes.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});