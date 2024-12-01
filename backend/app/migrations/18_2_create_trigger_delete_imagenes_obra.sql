CREATE TRIGGER IF NOT EXISTS before_dalete_imagenes_obra
BEFORE UPDATE ON Obras
FOR EACH ROW
BEGIN
    IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
        UPDATE Imagenes_obra SET deleted_at = NOW() WHERE id_obra = OLD.id;
    END IF;
END;