// src/screens/SensoresScreen.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { Sensor } from '../types'; 
import { SensorStatus } from '../enums/EnumSensor'; 
import { SensorCard } from '../components/'; // Crie o card de sensores correspondente
import { NovoRegistroModal } from '../components/NovoRegistroModal';
import { api } from '../services/api';

export function SensorScreen() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState<SensorStatus>(SensorStatus.INATIVO);

  async function fetchSensores() {
    try {
      setLoading(true);
      const response = await api.get<Sensor[]>('/sensores');
      setSensores(response.data);
    } catch (error) {
      console.error('Erro de rede ao buscar sensores:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvarSensor() {
    if (!nome || !localizacao) return;

    const payload: Sensor = {
      nome,
      tipo,
      localizacao,
      status,
    };

    try {
      const response = await api.post<Sensor>('/sensores', payload);
      setSensores((prev) => [response.data, ...prev]);
      
      setNome('');
      setLocalizacao('');
      setTipo('');
      setStatus(SensorStatus.OK);
      setModalVisible(false);
    } catch (error) {
      console.error('Falha ao registrar novo sensor:', error);
    }
  }

  async function handleDeletarSensor(id: number) {
    const executarExclusao = async () => {
      try {
        await api.delete(`/sensores/${id}`);
        setSensores((prev) => prev.filter(sensor => sensor.id !== id));
      } catch (error) {
        console.error('Erro ao deletar sensor no servidor:', error);
        if (Platform.OS === 'web') {
          alert("Não foi possível deletar o sensor do servidor.");
        } else {
          Alert.alert("Erro", "Não foi possível deletar o sensor do servidor.");
        }
      }
    };

    if (Platform.OS === 'web') {
      const confirmou = window.confirm("Tem certeza que deseja apagar este sensor permanentemente?");
      if (confirmou) await executarExclusao();
    } else {
      Alert.alert(
        "Confirmar Exclusão",
        "Tem certeza que deseja apagar este sensor permanentemente?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Excluir", style: "destructive", onPress: executarExclusao }
        ]
      );
    }
  }

  useEffect(() => {
    fetchSensores();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Gerenciamento de Sensores</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={styles.loader} />
      ) : (
        <FlatList
          data={sensores}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SensorCard sensor={item} onDelete={handleDeletarSensor} />
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum sensor monitorado no sistema.</Text>
          }
        />
      )}

      <NovoRegistroModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Cadastrar Novo Sensor"
        onSubmit={handleSalvarSensor}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Nome do Sensor</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Sensor de Temperatura Alpha"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Localização</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Setor de Carga Primário"
            value={localizacao}
            onChangeText={setLocalizacao}
          />

          <Text style={styles.label}>Tipo de Sensor</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Temperatura, Pressão, etc."
            value={tipo} // Pode ser ajustado para um campo de tipo no formulário
            onChangeText={setTipo} // Desabilitado por enquanto, já que não temos esse campo no backend
          />

          <Text style={styles.label}>Status Operacional</Text>
          <View style={styles.selectorRow}>
            {Object.values(SensorStatus).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.selectorButton,
                  status === item && styles.selectorButtonActive,
                ]}
                onPress={() => setStatus(item)}
              >
                <Text style={[
                  styles.selectorText,
                  status === item && styles.selectorTextActive
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

export default SensorScreen;

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