CREATE TABLE IF NOT EXISTS imagenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_obra INT NOT NULL,
    imagen_blob BLOB,
    etapa_obra ENUM('antes', 'durante', 'despues'),
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL,
    
    FOREIGN KEY (id_obra) REFERENCES Obras(id) ON DELETE CASCADE
);
