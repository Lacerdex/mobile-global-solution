// src/screens/EventosScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { Evento } from '../types';
import EventoCard from '../components/EventoCard'; 
import { NovoRegistroModal } from '../components/NovoRegistroModal';
import { api } from '../services/api';

export function EventoScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');

  async function fetchEventos() {
    try {
      setLoading(true);
      const response = await api.get<Evento[]>('/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error('Erro de rede ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvarEvento() {
    if (!nome || !tipo || !descricao) return;

    const payload: Evento = {
      nome,
      tipo,
      descricao,
    };

    try {
      const response = await api.post<Evento>('/eventos', payload);
      setEventos((prev) => [response.data, ...prev]);
      
      setNome('');
      setTipo('');
      setDescricao('');
      setModalVisible(false);
    } catch (error) {
      console.error('Falha ao registrar novo evento:', error);
    }
  }

  async function handleDeletarEvento(id: number) {
    const executarExclusao = async () => {
      try {
        await api.delete(`/eventos/${id}`);
        setEventos((prev) => prev.filter(evento => evento.id !== id));
      } catch (error) {
        console.error('Erro ao deletar evento no servidor:', error);
        if (Platform.OS === 'web') {
          alert("Não foi possível deletar o evento do servidor.");
        } else {
          Alert.alert("Erro", "Não foi possível deletar o evento do servidor.");
        }
      }
    };

    if (Platform.OS === 'web') {
      const confirmou = window.confirm("Tem certeza que deseja apagar este evento permanentemente?");
      if (confirmou) await executarExclusao();
    } else {
      Alert.alert(
        "Confirmar Exclusão",
        "Tem certeza que deseja apagar este evento permanentemente?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Excluir", style: "destructive", onPress: executarExclusao }
        ]
      );
    }
  }

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Histórico de Eventos</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <EventoCard evento={item} onDelete={handleDeletarEvento} />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum evento registrado no sistema.</Text>
          }
        />
      )}

      <NovoRegistroModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Registrar Novo Evento"
        onSubmit={handleSalvarEvento}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Título do Evento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Manutenção Preventiva Concluída"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Tipo de Evento</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Auditoria, Reparo, Inspeção"
            value={tipo}
            onChangeText={setTipo}
          />

          <Text style={styles.label}>Descrição Completa</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o que foi realizado neste evento..."
            multiline
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>
      </NovoRegistroModal>
    </View>
  );
}

export default EventoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingHorizontal: 16, paddingTop: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
  addButton: { backgroundColor: '#3498db', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  listContainer: { paddingBottom: 32 },
  loader: { flex: 1, justifyContent: 'center' },
  emptyText: { textAlign: 'center', color: '#95a5a6', marginTop: 40 },
  form: { gap: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#34495e', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, backgroundColor: '#fff' },
  textArea: { height: 80, textAlignVertical: 'top' },
});