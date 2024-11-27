export interface Spin {
  id: string;
  name: string;
  email: string;
  sucursal: string;
  award: string;
  createdAt: string;
}

export interface WheelData {
  option: string;
  style?: {
    backgroundColor?: string;
    textColor?: string;
  };
} 