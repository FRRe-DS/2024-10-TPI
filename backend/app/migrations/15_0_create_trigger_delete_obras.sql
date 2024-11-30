CREATE TRIGGER IF NOT EXISTS before_delete_obras
BEFORE UPDATE ON Autores
FOR EACH ROW
BEGIN
    IF OLD.deleted_at IS NULL AND NEW.deleted_at IS NOT NULL THEN
        UPDATE Obras SET deleted_at = NOW() WHERE autor_id = OLD.id;
    END IF;
END;