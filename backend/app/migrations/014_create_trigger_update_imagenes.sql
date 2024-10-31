CREATE TRIGGER before_update_imagenes
BEFORE UPDATE ON imagenes
FOR EACH ROW
BEGIN 
    SET NEW.updated_at = NOW();
END;