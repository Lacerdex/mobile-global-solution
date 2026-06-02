import { EnumAlerta } from '../enums';

export interface Alerta {
  id?: number;
  componente: string;
  descricao: string;
  gravidade: EnumAlerta;
  dataHora?: string;
}

export default Alerta;