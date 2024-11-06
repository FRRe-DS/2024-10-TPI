export interface Autor {
  apellido: string;
  id: number;
  biografia: string;
  pais_origen: string;
  dni: string;
  nombre: string;
  fec_nac: string;
}

export interface Escultura {
  id: number;
  autor_id: string;
  id_edicion: string;
  nombre_obra: string;
  descripcion: string;
  tecnica: string;
}
