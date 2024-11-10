CREATE TABLE IF NOT EXISTS Autores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	dni VARCHAR(8) NOT NULL,
	sexo CHAR(1),
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	fec_nac DATE NOT NULL,
	biografia TEXT NOT NULL,
	pais_origen VARCHAR(255) NOT NULL,
	tipo_banner VARCHAR(50),
	banner BLOB,
	tipo_imagen_autor VARCHAR(50), -- tipo de archivo (jpg, png, etc.)
	imagen_perfil BLOB,
	UNIQUE (dni, sexo), -- unicidad del autor por medio de la restriccion unique
  
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME DEFAULT NULL,
  deleted_at DATETIME DEFAULT NULL
);