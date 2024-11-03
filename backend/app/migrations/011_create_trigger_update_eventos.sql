
CREATE TRIGGER before_update_evento
BEFORE UPDATE ON evento
    FOR EACH ROW
    BEGIN
    SET NEW.updated_at = NOW();
END;


