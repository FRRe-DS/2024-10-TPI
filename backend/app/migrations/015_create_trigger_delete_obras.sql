-- es solo un borrado LOGICO
CREATE TRIGGER before_delete_obras
BEFORE DELETE ON Obras
FOR EACH ROW
BEGIN
    -- Este trigger solo registrará la acción en una tabla de auditoría
    INSERT INTO audit_log (obra_id, action, deleted_at) VALUES (OLD.id, 'delete', CURRENT_TIMESTAMP);
END;
