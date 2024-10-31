CREATE TABLE IF NOT EXISTS Votaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    artista_id INT NOT NULL,
    obra_id INT NOT NULL,
    nro_voto INT NOT NULL UNIQUE,
    fecha_voto DATETIME NOT NULL DEFAULT NOW(),
    
    UNIQUE (usuario_id, artista_id, obra_id),
    
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (artista_id) REFERENCES Autores(id),
    FOREIGN KEY (obra_id) REFERENCES Obras(id)
);

-- PROCEDIMIENTO ALMACENADO PARA CONTROLAR QUE EL USUARIO SOLO VOTO UNA VEZ

DELIMITER //

CREATE PROCEDURE RegistrarVoto(
    IN p_usuario_id INT,
    IN p_artista_id INT,
    IN p_obra_id INT
)
BEGIN
    -- verfico que el usuario voto por una sola obra
    IF EXISTS (
        SELECT 1
        FROM Votaciones
        WHERE usuario_id = p_usuario_id 
          AND artista_id = p_artista_id 
          AND obra_id = p_obra_id
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario ya ha votado por esta obra.';
    ELSE
        INSERT INTO Votaciones (usuario_id, artista_id, obra_id)
        VALUES (p_usuario_id, p_artista_id, p_obra_id);
    END IF;
END //

DELIMITER ;
