// App.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// IMPORTAÇÕES REAIS E DIRETAS DAS SUAS TELAS (Evita conflitos de exportação nomeada)
import { AlertaScreen, SensorScreen, EventoScreen } from './src/screens';
export default function App() {
  const [currentTab, setCurrentTab] = useState<'sensores' | 'eventos' | 'alertas'>('alertas');

  const renderContent = () => {
    switch (currentTab) {
      case 'sensores': return <SensorScreen />;
      case 'eventos': return <EventoScreen />;
      case 'alertas': return <AlertaScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Core Monitoramento</Text>
      </View>

      <View style={styles.mainContent}>
        {renderContent()}
      </View>

      {/* Navegação Inferior */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, currentTab === 'sensores' && styles.tabButtonActive]}
          onPress={() => setCurrentTab('sensores')}
        >
          <Text style={[styles.tabButtonText, currentTab === 'sensores' && styles.tabButtonTextActive]}>Sensores</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, currentTab === 'eventos' && styles.tabButtonActive]}
          onPress={() => setCurrentTab('eventos')}
        >
          <Text style={[styles.tabButtonText, currentTab === 'eventos' && styles.tabButtonTextActive]}>Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, currentTab === 'alertas' && styles.tabButtonActive]}
          onPress={() => setCurrentTab('alertas')}
        >
          <Text style={[styles.tabButtonText, currentTab === 'alertas' && styles.tabButtonTextActive]}>Alertas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  appBar: {
    height: 56,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabContainer: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 12 : 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    borderTopWidth: 3,
    borderTopColor: '#3498db',
  },
  tabButtonText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#3498db',
    fontWeight: '700',
  },
});