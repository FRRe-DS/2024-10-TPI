CREATE TABLE IF NOT EXISTS Votaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    obra_id INT NOT NULL,
    nro_voto INT NOT NULL UNIQUE,
    fecha_voto DATETIME NOT NULL DEFAULT NOW(),
    
    UNIQUE (usuario_id, obra_id),
    
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (obra_id) REFERENCES Obras(id)
);

-- PROCEDIMIENTO ALMACENADO PARA CONTROLAR QUE EL USUARIO SOLO VOTO UNA VEZ


 


