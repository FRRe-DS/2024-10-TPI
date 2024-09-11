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
