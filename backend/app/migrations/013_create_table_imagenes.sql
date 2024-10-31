CREATE TABLE IF NOT EXISTS imagenes (
	id_obra INT AUTO_INCREMENT PRIMARY KEY,
    nombre_obra VARCHAR(120) NOT NULL,
	tipo_imagen VARCHAR(50), -- tipo de archivo (jpg, png, etc.)
	imagen BLOB, -- almacenamos la imagen en formato binario

	FOREIGN KEY (obra_id) REFERENCES Obras(id) ON DELETE CASCADE -- Eliminación en cascada
);
