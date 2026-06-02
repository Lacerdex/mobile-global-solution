// src/screens/AlertasScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { Alerta } from '../types';
import { EnumAlerta } from '../enums';
import { AlertaCard } from '../components/AlertaCard';
import { NovoRegistroModal } from '../components/NovoRegistroModal';
import { api } from '../services/api';

export function AlertaScreen() {
  const [alerts, setAlerts] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [componente, setComponente] = useState('');
  const [descricao, setDescricao] = useState('');
  const [gravidade, setGravidade] = useState<EnumAlerta>(EnumAlerta.MEDIA);

  async function fetchAlertas() {
    try {
      setLoading(true);
      const response = await api.get<Alerta[]>('/alertas');
      setAlerts(response.data);
    } catch (error) {
      console.error('Erro de rede ao buscar alertas:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvarAlerta() {
    if (!componente || !descricao) return;

    const payload: Alerta = {
      componente,
      descricao,
      gravidade,
    };

    try {
      const response = await api.post<Alerta>('/alertas', payload);
      setAlerts((prev) => [response.data, ...prev]);
      
      setComponente('');
      setDescricao('');
      setGravidade(EnumAlerta.MEDIA);
      setModalVisible(false);
    } catch (error) {
      console.error('Falha ao registrar novo alerta:', error);
    }
  }

  // Função de exclusão conectada ao Backend
async function handleDeletarAlerta(id: number) {
    const executarExclusao = async () => {
        try {
        // Faz a chamada de deleção
        await api.delete(`/alertas/${id}`);
        
        // Remove o item do estado de forma reativa para sumir da tela
        setAlerts((prev) => prev.filter(alert => alert.id !== id));
        } catch (error) {
        console.error('Erro ao deletar alerta no servidor:', error);
        if (Platform.OS === 'web') {
            alert("Não foi possível deletar o alerta do servidor.");
        } else {
            Alert.alert("Erro", "Não foi possível deletar o alerta do servidor.");
        }
        }
};

if (Platform.OS === 'web') {
    const confirmou = window.confirm("Tem certeza que deseja apagar este alerta permanentemente?");
    if (confirmou) {
      await executarExclusao();
    }
  } 
  // SE ESTIVER NO CELULAR (Android/iOS): Usa o Alert do React Native
  else {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja apagar este alerta permanentemente?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: executarExclusao }
      ]
    );
  }
}

  useEffect(() => {
    fetchAlertas();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Alertas Operacionais</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <FlatList
          data={alerts}
          keyExtractor={(item) => String(item.id)}
          // Passamos a função de deletar aqui no renderItem
          renderItem={({ item }) => (
            <AlertaCard alerta={item} onDelete={handleDeletarAlerta} />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum alerta ativo no sistema.</Text>
          }
        />
      )}

      <NovoRegistroModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Cadastrar Novo Alerta"
        onSubmit={handleSalvarAlerta}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Componente</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Propulsor Auxiliar"
            value={componente}
            onChangeText={setComponente}
          />

          <Text style={styles.label}>Descrição do Incidente</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalhes técnicos da ocorrência..."
            multiline
            numberOfLines={3}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>Nível de Gravidade</Text>
          <View style={styles.selectorRow}>
            {Object.values(EnumAlerta).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.selectorButton,
                  gravidade === item && styles.selectorButtonActive,
                ]}
                onPress={() => setGravidade(item)}
              >
                <Text style={[
                  styles.selectorText,
                  gravidade === item && styles.selectorTextActive
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </NovoRegistroModal>
    </View>
  );
}

export default AlertaScreen;

// Mantendo os estilos idênticos aos fornecidos por você...
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
  selectorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  selectorButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, borderWidth: 1, borderColor: '#bdc3c7', backgroundColor: '#fff' },
  selectorButtonActive: { backgroundColor: '#3498db', borderColor: '#3498db' },
  selectorText: { color: '#7f8c8d', fontWeight: '500', fontSize: 12 },
  selectorTextActive: { color: '#fff', fontWeight: 'bold' },
});