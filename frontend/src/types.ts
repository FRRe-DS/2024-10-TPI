// Interfaz para los contactos del autor
export interface Contacto {
  id: number;
  autor: number;
  tipo: string;
  contenido: string;
}

// Interfaz para el autor individual
export interface Autor {
  id: number;
  nombre: string;
  apellido: string;
  fec_nac: string;
  biografia: string;
  pais_origen: string;
  url: string;
  public_id: string;
  contactos: Contacto[];
}

// Interfaz para la respuesta paginada, no pude cambiarlo
export interface AutorPaginatedResponse {
  items: Autor[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Interfaz para la obra
export interface Escultura {
  id: number;
  autor_id: number;
  id_edicion: number;
  nombre_obra: string;
  descripcion: string;
  tecnica: string;
  cant_votos:number,
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  autor: {
    id: number;
    nombre: string;
    apellido: string;
    pais_origen: string;
  };
  imagenes: {
    id: number;
    id_obra: number;
    url: string;
    public_id: string;
    etapa_obra: "antes" | "durante" | "despues";
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
  }[];
}

// Interfaz para la respuesta paginada de obras, asi estoy recibiendo del back.
export interface EsculturaPaginatedResponse {
  items: Escultura[];
  total: number;
  page: number;
  size: number;
  pages: number;
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

export interface Usuario {
  contrasenia_hasheada: string;
  id: number;
  correo: string;
  rol: "votante" | "admin" | "visualizadorQR";
  nombre: string;
  apellido: string;
}
