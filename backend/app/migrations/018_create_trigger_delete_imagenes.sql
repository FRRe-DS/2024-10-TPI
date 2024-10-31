CREATE TRIGGER before_delete_imagenes
BEFORE DELETE ON imagenes
FOR EACH ROW
BEGIN
    -- Aquí podrías registrar la eliminación, por ejemplo, en una tabla de auditoría
    INSERT INTO audit_log (event_id, action, deleted_at) VALUES (OLD.id, 'delete', NOW());
END;

