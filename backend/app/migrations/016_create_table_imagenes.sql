CREATE TABLE IF NOT EXISTS imagenes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_obra INT NOT NULL,
	id_autor INT NOT NULL,
    nombre_obra VARCHAR(120) NOT NULL,
	tipo_imagen VARCHAR(50), -- tipo de archivo (jpg, png, etc.)
	imagen BLOB, -- almacenamos la imagen en formato binario
    etapa_obra VARCHAR(16),
	created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL,
	deleted_at DATETIME DEFAULT NULL,
	
	FOREIGN KEY (id_obra) REFERENCES Obras(id) ON DELETE CASCADE, -- Eliminación en cascada
	FOREIGN KEY (id_autor) REFERENCES Autores(id) ON DELETE NO ACTION
);
