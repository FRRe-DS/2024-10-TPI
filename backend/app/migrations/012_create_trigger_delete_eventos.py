with engine.connect() as connection:
    # Eliminar el trigger si existe
    connection.execute("DROP TRIGGER IF EXISTS before_delete_evento;")

    # Crear el nuevo trigger
    connection.execute("""
        CREATE TRIGGER before_delete_evento
        BEFORE DELETE ON evento
        FOR EACH ROW
        BEGIN
            INSERT INTO audit_log (event_id, action, deleted_at) VALUES (OLD.id_evento, 'delete', CURRENT_TIMESTAMP);
        END;
    """)
