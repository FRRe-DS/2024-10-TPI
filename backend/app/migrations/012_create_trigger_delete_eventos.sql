CREATE TRIGGER before_delete_evento
BEFORE DELETE ON evento
FOR EACH ROW
BEGIN
    IF OLD.deleted_at IS NULL THEN
        UPDATE evento SET deleted_at = NOW() WHERE id = OLD.id;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operación de borrado prevenida, borrado lógico aplicado.';
    END IF;
END;
   
