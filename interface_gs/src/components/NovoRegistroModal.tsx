import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

interface NovoRegistroModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

export function NovoRegistroModal({ visible, onClose, title, onSubmit, children }: NovoRegistroModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.container}
        >
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
                <Text style={styles.btnCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnSubmit]} onPress={onSubmit}>
                <Text style={styles.btnSubmitText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

export default NovoRegistroModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    maxHeight: '85%',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
  },
  btnCancelText: {
    color: '#7f8c8d',
    fontWeight: '600',
  },
  btnSubmit: {
    backgroundColor: '#3498db',
  },
  btnSubmitText: {
    color: '#fff',
    fontWeight: '600',
  },
});