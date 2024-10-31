from sqlalchemy import create_engine

# Crea el motor de la base de datos
engine = create_engine('mysql+pymysql://usuario:contraseña@localhost/bienaldb')

# Conéctate a la base de datos y ejecuta las sentencias por separado
with engine.connect() as connection:
    # Elimina el trigger si existe
    connection.execute("DROP TRIGGER IF EXISTS before_update_evento;")

    # Crea el nuevo trigger
    connection.execute("""
        CREATE TRIGGER before_update_evento
        BEFORE UPDATE ON evento
        FOR EACH ROW
        BEGIN
            SET NEW.updated_at = CURRENT_TIMESTAMP;
        END;
    """)

