# Backend con FastAPI

## Pasos para configurar el entorno virtual:

### 1. Navega al directorio del proyecto

```sh
cd backend
```

### 2. Crea un entorno virtual

Crea un entorno virtual en tu máquina local. El entorno virtual se llamará env-tpi.

```sh
python -m venv env-tpi
```

### 3. Activa el entorno virtual

```sh
env-tpi\Scripts\activate
```

> Nota: Si obtienes un error sobre la ejecución de scripts, ejecuta lo siguiente en PowerShell:

```sh
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

> Luego, intenta activar el entorno de nuevo.

### 4. Instala las dependencias

Una vez que el entorno virtual esté activado, instala todas las dependencias necesarias utilizando el archivo requirements.txt.

```sh
pip install -r requirements.txt
```

### 3. Desactivar el entorno virtual

Cuando termines de trabajar, puedes desactivar el entorno virtual usando el comando:

```sh
deactivate
```

### 4. Actualizar dependencias (opcional)

Si añades o cambias dependencias, asegúrate de actualizar el archivo requirements.txt con:

```sh
pip freeze > requirements.txt
```

> Nota: Esto lo debes hacer antes de desactivar el entorno virtual.

## Para ejecutar la aplicacion:

```sh
uvicorn app.main:app
```

## Para ejecutar la aplicacion y que se actualice en cada cambio

```sh
uvicorn app.main:app --reload
```

## Para ejecutar la aplicacion especificando host y puerto

```sh
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

### Resumen de Comandos de Alembic

A continuación, te dejo un resumen de los comandos más utilizados de **Alembic** para gestionar migraciones de bases de datos en tus proyectos:

# Comandos de Alembic

## Inicializar Alembic

### `alembic init <directorio>`

Inicializa Alembic en tu proyecto, creando la estructura de directorios necesaria.

> Nota: Ya esta inicializado, no es necesario volverlo a hacer.

```sh
alembic init migrations
```

## Crear Migraciones

### `alembic revision -m "<mensaje>"`

Crea una nueva migración vacía con un mensaje descriptivo. Útil si deseas escribir la migración manualmente.

```sh
alembic revision -m "crear tabla users"
```

### `alembic revision --autogenerate -m "<mensaje>"`

Genera una nueva migración automáticamente, detectando cambios en los modelos y esquemas.

```sh
alembic revision --autogenerate -m "agregar campo email a users"
```

> Nota: Este es el comando que recomiendo usar, para que detecte automatico los cambios que hicimos.

## Aplicar Migraciones

### `alembic upgrade <versión>`

Aplica una migración o un conjunto de migraciones hasta la versión especificada.

```sh
alembic upgrade head   # Aplica todas las migraciones pendientes.
alembic upgrade <id_de_revision>   # Aplica migraciones hasta una versión específica.
```

### `alembic downgrade <versión>`

Revierte una o más migraciones hasta la versión especificada.

```sh
alembic downgrade -1   # Revierte la última migración.
alembic downgrade <id_de_revision>   # Revierte hasta una versión específica.
```

## Ver Historial de Migraciones

### `alembic history`

Muestra el historial de migraciones, incluyendo todas las revisiones aplicadas.

```sh
alembic history
```

### `alembic current`

Muestra la versión actual de la base de datos.

```sh
alembic current
```

## Revisar Cambios Pendientes

### `alembic check`

Verifica si existen diferencias entre el esquema de la base de datos y los modelos definidos.

```sh
alembic check
```

## Resetear el Estado de las Migraciones

### `alembic stamp <versión>`

Marca la base de datos como si estuviera en una versión específica sin aplicar ninguna migración.

```sh
alembic stamp head   # Marca todas las migraciones como aplicadas.
alembic stamp <id_de_revision>   # Marca hasta una versión específica.
```
