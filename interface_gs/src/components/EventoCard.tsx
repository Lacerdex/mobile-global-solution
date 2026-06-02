// src/components/EventoCard.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Evento } from '../types';

interface EventoCardProps {
  evento: Evento;
  onDelete: (id: number) => void;
}

export function EventoCard({ evento, onDelete }: EventoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{evento.nome}</Text>
          <Text style={styles.type}>Tipo: {evento.tipo}</Text>
          <Text style={styles.description}>{evento.descricao}</Text>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => evento.id && onDelete(evento.id)}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EventoCard;

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
  type: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3498db',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 6,
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