CREATE TRIGGER before_update_imagenes
BEFORE UPDATE ON imagenes
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW(); -- Actualiza el campo updated_at antes de modificar el registro
END;
