CREATE TRIGGER before_update_imagenes_autor
BEFORE UPDATE ON Imagenes_autor
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW(); -- Actualiza el campo updated_at antes de modificar el registro
END;
