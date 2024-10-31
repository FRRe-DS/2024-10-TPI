CREATE TABLE IF NOT EXISTS Obras (
	id INT AUTO_INCREMENT PRIMARY KEY,
	autor_id INT NOT NULL,
    edicion INT NOT NULL,
	nombre_obra VARCHAR(255) NOT NULL,
	descripcion TEXT,
	tecnica VARCHAR(50),
	imagen BLOB, -- almacenamos la imagen en formato binario
   
	
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME DEFAULT NULL,
	deleted_at DATETIME DEFAULT NULL,

	FOREIGN KEY (autor_id) REFERENCES Autores(id),
	FOREIGN KEY (edicion) REFERENCES evento(edicion)
);

-- otro enfoque podria ser almacenar por la ruta la imagen para no cargar tanto a la base de datos, todo depende que tipo de enfoque se de al momento de almacenar

-- tambien podria ser usada la referencia a la tabla entidad debil imagenes para la actualizacion de la foto

-- en este caso se esta almacenando el formato binario de la imagen de la obra, es decir la imagen tal cual