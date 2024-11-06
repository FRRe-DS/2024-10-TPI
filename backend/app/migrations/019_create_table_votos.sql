CREATE TABLE IF NOT EXISTS Votos (
    usuario_id INT NOT NULL,
    obra_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL,
    
    PRIMARY KEY (usuario_id, obra_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (obra_id) REFERENCES Obras(id)
);
