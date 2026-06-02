export interface Evento {
  id?: number;
  nome: string;
  tipo: string;
  descricao: string;
  dataHora?: string;
}

export default Evento;