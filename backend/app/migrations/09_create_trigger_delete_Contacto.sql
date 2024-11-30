CREATE TRIGGER IF NOT EXISTS soft_delete_Contacto
BEFORE UPDATE ON Autores
FOR EACH ROW
BEGIN
  -- Verificar si el autor está siendo marcado como eliminado
  IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
    -- Marcar los contactos relacionados como eliminados (borrado lógico)
    UPDATE Contactos SET deleted_at = NOW() WHERE autor = OLD.id;
  END IF;
END;
