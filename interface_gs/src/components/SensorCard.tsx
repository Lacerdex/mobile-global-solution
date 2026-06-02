// src/components/SensorCard.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Sensor } from '../types';

interface SensorCardProps {
  sensor: Sensor;
  onDelete: (id: number) => void; // <--- Adicionado
}

export function SensorCard({ sensor, onDelete }: SensorCardProps) {
  // Cor dinâmica baseada no status do sensor
  const getStatusColor = (status: string) => {
    switch (status) {
      default: return '#7f8c8d';
      case 'OK': return '#2ecc71';
      case 'ALERTA': return '#f1c40f';
      case 'CRITICO': return '#e74c3c';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{sensor.nome}</Text>
          <Text style={styles.subtitle}>Tipo: {sensor.tipo}</Text>
          <Text style={styles.type}>Localização: {sensor.localizacao}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(sensor.status) }]}>
            <Text style={styles.statusText}>{sensor.status}</Text>
          </View>
        </View>

        {/* Botão de Excluir adicionado ao Card */}
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => sensor.id && onDelete(sensor.id)}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SensorCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#282929',
    marginTop: 4,
    fontStyle: 'italic',
  },
  type: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#fce4e4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
  }
});