export interface Autor {
  apellido: string;
  id: number;
  biografia: string;
  pais_origen: string;
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
  autor: {
    id: number;
    nombre: string;
    apellido: string;
    pais_origen: string;
  };
}


export interface Eventos {
  edicion: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  lugar: string;
  descripcion: string;
  tematica: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}