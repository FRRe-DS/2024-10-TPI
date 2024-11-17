CREATE TRIGGER IF NOT EXISTS before_delete_imagenes_obra
BEFORE DELETE ON Imagenes_obra
FOR EACH ROW
BEGIN
    IF OLD.deleted_at IS NULL THEN
        UPDATE Imagenes_obra SET deleted_at = NOW() WHERE id = OLD.id;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Operación de borrado prevenida, borrado lógico aplicado.';
    END IF;
END;

