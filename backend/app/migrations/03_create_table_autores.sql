CREATE TABLE IF NOT EXISTS Autores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	apellido VARCHAR(255) NOT NULL,
	fec_nac DATE NOT NULL,
	biografia TEXT NOT NULL,
	pais_origen VARCHAR(255) NOT NULL,
	url VARCHAR(255) NOT NULL,
    public_id VARCHAR(255) NOT NULL,

  created_at DATETIME NOT NULL DEFAULT NOW(),
  updated_at DATETIME DEFAULT NULL,
  deleted_at DATETIME DEFAULT NULL
);
