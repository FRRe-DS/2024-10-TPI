# Backend con FastAPI
Este repositorio contiene el backend desarrollado con FastAPI, una framework moderno y rápido para construir APIs en Python
## Requisitos Previos
* Python 3.8+
* pip (Administrador de paquetes de Python)

## Configuración del Entorno de Desarrollo
Sigue los siguientes pasos para configurar tu entorno de desarrollo:

### 1. Clona el repositorio y navega al directorio del proyecto

```sh
git clone https://github.com/tu-repo/backend-fastapi.git
cd backend
```
### 2. Crea un entorno virtual
Crea un entorno virtual en tu máquina local, que llamaremos `env-tpi`.

```sh
python -m venv env-tpi
```
### 3. Activa el entorno virtual
**En Windows:**
```sh
env-tpi\Scripts\activate
```
**En Linux/MacOS:**
``` sh
source env-tpi/bin/activate
```
> Nota: Si encuentras un error relacionado con la ejecución de scripts en Windows, puedes solucionarlo ejecutando el siguiente comando en PowerShell:

```sh
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Luego, intenta activar el entorno nuevamente.

### 4. Instala las dependencias
Una vez que el entorno virtual esté activado, instala todas las dependencias necesarias utilizando el archivo `requirements.txt`.

```sh
pip install -r requirements.txt
```

### 5. Desactiva el entorno virtual
Cuando termines de trabajar, puedes desactivar el entorno virtual usando el siguiente comando:

```sh
deactivate
```
## Gestión de Dependencias
### Agregar una dependencia
Para agregar una nueva dependencia al proyecto, puedes usar:

```sh
pip install nombre_dependencia
```
### Eliminar una dependencia
Para eliminar una dependencia existente:

```sh
pip uninstall nombre_dependencia
```
### Actualizar `requirements.txt`
Si has agregado o eliminado dependencias, asegúrate de actualizar el archivo requirements.txt ejecutando:

```sh
pip freeze > requirements.txt
```
> [!NOTA]: Asegúrate de hacer esto antes de desactivar el entorno virtual.

## Ejecución de la Aplicación
### Iniciar la aplicación
Para iniciar el servidor FastAPI, ejecuta:

```sh
uvicorn app.main:app
```
### Ejecución en modo de recarga automática
Si deseas que la aplicación se recargue automáticamente al realizar cambios en el código:

```sh
uvicorn app.main:app --reload
```
### Especificar host y puerto
Si necesitas que la aplicación escuche en un host o puerto específico:

```sh
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

### Generación de Datos en la Base de Datos
Puedes ejecutar scripts de generación de datos para poblar las tablas de la base de datos.

### Ejecutar script de generación de datos
Reemplaza `tablaGenerator` por el nombre del generador de la tabla correspondiente:

```sh
python -m app.seeds.generators.tablaGenerator
```

## Contribuciones
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:
...