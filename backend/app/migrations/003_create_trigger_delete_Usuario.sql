CREATE TRIGGER IF NOT EXISTS soft_delete_Usuario
BEFORE DELETE ON Usuarios
FOR EACH ROW
BEGIN
  IF OLD.deleted_at IS NULL THEN
        UPDATE Usuarios SET deleted_at = NOW() WHERE id = OLD.id;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operación de borrado prevenida, borrado lógico aplicado.';
    END IF;
END;