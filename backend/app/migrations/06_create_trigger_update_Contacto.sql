CREATE TRIGGER IF NOT EXISTS update_Contacto_date
BEFORE UPDATE ON Contactos
FOR EACH ROW
BEGIN
  SET NEW.updated_at = NOW();
END;