CREATE TABLE IF NOT EXISTS Obras (
	id INT AUTO_INCREMENT PRIMARY KEY,
	autor_id INT NOT NULL,
  id_edicion INT NOT NULL,
	nombre_obra VARCHAR(255) NOT NULL,
	descripcion TEXT,
	tecnica VARCHAR(50),
	
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME DEFAULT NULL,
	deleted_at DATETIME DEFAULT NULL,

	FOREIGN KEY (autor_id) REFERENCES Autores(id),
	FOREIGN KEY (id_edicion) REFERENCES Eventos(edicion)
);

