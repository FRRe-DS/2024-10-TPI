import os
from sqlalchemy import text
from app.config.db import engine

def apply_migrations():
    migrations_dir = os.path.join(os.path.dirname(__file__), '..', 'migrations')
    
    migration_files = sorted(f for f in os.listdir(migrations_dir) if f.endswith(".sql"))
    
    with engine.connect() as connection:
        for migration_file in migration_files:
            file_path = os.path.join(migrations_dir, migration_file)
            with open(file_path, "r") as file:
                sql_script = file.read()
            
            print(f"Ejecutando {migration_file}...")
            
            # Ejecutar el script SQL
            connection.execute(text(sql_script))
    
    print("Migraciones aplicadas con éxito.")
