CREATE TRIGGER IF NOT EXISTS before_update_imagenes_autor
BEFORE UPDATE ON Imagenes_autor
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END;