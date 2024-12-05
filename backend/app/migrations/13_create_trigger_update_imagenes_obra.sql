CREATE TRIGGER IF NOT EXISTS before_update_imagenes_obra
BEFORE UPDATE ON Imagenes_obra
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW(); -- Actualiza el campo updated_at antes de modificar el registro
END;
