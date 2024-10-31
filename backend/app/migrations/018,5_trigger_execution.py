from sqlalchemy import create_engine

# Reemplaza con tu cadena de conexión
engine = create_engine('mysql+pymysql://user:password@host/dbname')

with engine.connect() as connection:
    # Ejecutar la consulta para crear el trigger
    connection.execute("""
    DROP TRIGGER IF EXISTS before_delete_imagenes;

    CREATE TRIGGER before_delete_imagenes
    BEFORE DELETE ON imagenes
    FOR EACH ROW
    BEGIN
        INSERT INTO audit_log (event_id, action, deleted_at) VALUES (OLD.id, 'delete', NOW());
    END;
    """)
