CREATE TABLE IF NOT EXISTS Imagenes_autor (
    id_autor INT NOT NULL,
    id_imagen INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL,
    
    FOREIGN KEY (id_imagen) REFERENCES Imagenes(id),
    FOREIGN KEY (id_autor) REFERENCES Autores(id)
);
