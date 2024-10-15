CREATE TRIGGER IF NOT EXISTS soft_delete_Contacto
BEFORE DELETE ON Contactos
FOR EACH ROW
BEGIN
  IF OLD.deleted_at IS NULL THEN
        UPDATE Contactos SET deleted_at = NOW() WHERE id = OLD.id;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operacion de borrado prevenida, borrado logico aplicado.';
    END IF;
END;