CREATE PROCEDURE RegistrarVoto(
    IN p_usuario_id INT,
    IN p_obra_id INT
)
BEGIN
    -- verfico que el usuario voto por una sola obra
    IF EXISTS (
        SELECT 1
        FROM Votaciones
        WHERE usuario_id = p_usuario_id  
          AND obra_id = p_obra_id
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario ya ha votado por esta obra.';
    ELSE
        INSERT INTO Votaciones (usuario_id, obra_id)
        VALUES (p_usuario_id, p_obra_id);
    END IF;
END;