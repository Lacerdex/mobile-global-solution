// src/components/AlertaCard.tsx
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Alerta } from '../types';
import { EnumAlerta } from '../enums';

interface AlertaCardProps {
  alerta: Alerta;
  onDelete: (id: number) => void; // Propriedade adicionada
}

export function AlertaCard({ alerta, onDelete }: AlertaCardProps) {
  const getSeverityStyle = (gravidade: EnumAlerta) => {
    switch (gravidade) {
      case EnumAlerta.BAIXA:
        return { bg: '#e3f2fd', txt: '#0d47a1', border: '#bbdefb' };
      case EnumAlerta.MEDIA:
        return { bg: '#fffde7', txt: '#f57f17', border: '#fff9c4' };
      case EnumAlerta.ALTA:
        return { bg: '#fff3e0', txt: '#e65100', border: '#ffe0b2' };
      case EnumAlerta.CRITICO:
        return { bg: '#ffebee', txt: '#b71c1c', border: '#ffcdd2' };
      default:
        return { bg: '#f5f5f5', txt: '#212121', border: '#e0e0e0' };
    }
  };

  const colors = getSeverityStyle(alerta.gravidade);

  return (
    <View style={[styles.card, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
        <Text style={styles.componente}>{alerta.componente}</Text>
        <View style={[styles.badge, { backgroundColor: colors.border }]}>
          <Text style={[styles.badgeText, { color: colors.txt }]}>{alerta.gravidade}</Text>
        </View>
      </View>
      
      <Text style={[styles.descricao, { color: colors.txt }]}>{alerta.descricao}</Text>
      
      {/* Rodapé do Card com o Botão de Excluir */}
      <View style={styles.footerRow}>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => alerta.id && onDelete(alerta.id)}
        >
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  componente: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 8,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteButtonText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '600',
  }
});