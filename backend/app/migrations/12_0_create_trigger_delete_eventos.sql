CREATE TRIGGER IF NOT EXISTS before_delete_evento
BEFORE DELETE ON Eventos
FOR EACH ROW
BEGIN
    IF OLD.deleted_at IS NULL THEN
        UPDATE Eventos SET deleted_at = NOW() WHERE id = OLD.edicion;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operación de borrado prevenida, borrado lógico aplicado.';
    END IF;
END;
   
