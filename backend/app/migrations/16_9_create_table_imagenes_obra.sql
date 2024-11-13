CREATE TABLE IF NOT EXISTS Imagenes_obra (
    id_obra INT NOT NULL,
    id_imagen INT NOT NULL,
    etapa_obra ENUM('antes', 'durante', 'despues'),
    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL,
   
    PRIMARY KEY (id_obra, id_imagen),
    FOREIGN KEY (id_obra) REFERENCES Obras(id),
    FOREIGN KEY (id_imagen) REFERENCES Imagenes(id)
);
