CREATE TRIGGER IF NOT EXISTS soft_delete_Autor
BEFORE DELETE ON Autores
FOR EACH ROW
BEGIN
  IF OLD.deleted_at IS NULL THEN
        UPDATE Autores SET deleted_at = NOW() WHERE id = OLD.id;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operacion de borrado prevenida, borrado logico aplicado.';
    END IF;
END;