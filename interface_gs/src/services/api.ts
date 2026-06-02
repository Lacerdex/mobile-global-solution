// src/services/api.ts
import axios from 'axios';

// Substitua pelo IP da sua máquina onde o Spring Boot está rodando
const BASE_URL = 'http://localhost:8080/api'; 

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});