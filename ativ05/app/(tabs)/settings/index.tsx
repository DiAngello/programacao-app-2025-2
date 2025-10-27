import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#8A8A8E',
  separator: '#F0F0F0',
};

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>Ajustes</Text>
        
        <Link href="/settings/settings-options" asChild>
          <Pressable style={styles.card}>
            <Ionicons name="options-outline" size={24} color={COLORS.textSecondary} />
            <Text style={styles.cardTitle}>Opções Avançadas</Text>
            <Ionicons name="chevron-forward-outline" size={22} color={COLORS.textSecondary} />
          </Pressable>
        </Link>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.separator,
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.text,
    marginLeft: 16,
  },
});