CREATE TABLE IF NOT EXISTS Votos (
    usuario_id INT NOT NULL,
    obra_id INT NOT NULL,
    estrellas TINYINT NOT NULL CHECK (estrellas BETWEEN 1 AND 5),

    created_at DATETIME NOT NULL DEFAULT NOW(),
    updated_at DATETIME DEFAULT NULL,
    deleted_at DATETIME DEFAULT NULL,
    
    PRIMARY KEY (usuario_id, obra_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (obra_id) REFERENCES Obras(id)
);
