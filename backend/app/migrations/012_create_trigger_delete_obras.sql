-- es solo un borrado LOGICO
CREATE TRIGGER before_delete_obras
BEFORE DELETE ON Obras
FOR EACH ROW
BEGIN
    SET OLD.deleted_at = NOW(); 
    UPDATE Obras
    SET deleted_at = OLD.deleted_at
    WHERE id = OLD.id;
END;
