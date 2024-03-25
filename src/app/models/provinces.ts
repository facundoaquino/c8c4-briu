
export interface IProvincesResponse {
  cantidad: number;
  inicio: number;
  parametros: object;
  provincias: IProvince[];
  total: number;
}

export interface IProvince {
  centroide: ICoordenada;
  id: string;
  nombre: string;
}

export interface ICoordenada {
  lat: number;
  lon: number;
}
