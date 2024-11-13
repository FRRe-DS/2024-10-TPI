CREATE TABLE IF NOT EXISTS Usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	contrasenia_hasheada VARCHAR(255) NOT NULL,
	rol VARCHAR(25),
	correo VARCHAR(255) NOT NULL UNIQUE,
  
  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME DEFAULT NULL,
  deleted_at DATETIME DEFAULT NULL
);