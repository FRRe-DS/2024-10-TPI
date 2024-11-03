CREATE TRIGGER before_update_obras
BEFORE UPDATE ON Obras
FOR EACH ROW
BEGIN
    SET NEW.updated_at = NOW();
END;
