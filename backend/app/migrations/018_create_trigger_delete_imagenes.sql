CREATE TRIGGER before_delete_imagenes
BEFORE DELETE ON imagenes
FOR EACH ROW
BEGIN
    IF OLD.deleted_at IS NULL THEN
        UPDATE imagenes SET deleted_at = NOW() WHERE id = OLD.id;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operación de borrado prevenida, borrado lógico aplicado.';
    END IF;
END;

