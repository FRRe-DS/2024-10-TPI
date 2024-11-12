CREATE TRIGGER before_delete_imagenes_autor
BEFORE DELETE ON Imagenes
FOR EACH ROW
BEGIN
    IF OLD.deleted_at IS NULL THEN
        UPDATE Imagenes SET deleted_at = NOW() WHERE id = OLD.id;
    END IF;
END;