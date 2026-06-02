import { SensorStatus } from "../enums/EnumSensor";

export interface Sensor {
  id?: number;
  nome: string;
  tipo: string;
  status: SensorStatus;
  dataHora?: string;
  localizacao: string;
}

export default Sensor;