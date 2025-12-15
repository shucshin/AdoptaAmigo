# Pasos para correr el proyecto

---

## Backend (Django)

> **IMPORTANTE:** Todos los comandos deben ejecutarse dentro de la carpeta  
> **`AdoptaAmigo/adopta_amigo`**


Crea y activa un entorno virtual de Python:

En Linux o macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```


Instala los requerimientos necesarios:

```bash
pip install -r requirements.txt
```
Crea las migraciones y aplica los cambios:

#### **1. Configuración del Entorno Virtual**
Aplica los cambios en la base de datos:

> **Nota:** Si acabas de descargar cambios del repositorio (`git pull`), ejecuta este comando para evitar errores.

```bash
python manage.py migrate
```

Cargar Mascotas Iniciales (Base de Datos Precargada)

```bash
python manage.py loaddata mascotas_iniciales.json
```
Creación de usuario administrador

```bash
python manage.py createsuperuser
```

Ejecución del servidor backend

```bash
python manage.py runserver
```

El backend estará disponible en:

```
http://127.0.0.1:8000/
```

---
## Frontend

> **IMPORTANTE:** Todos los comandos deben ejecutarse dentro de la carpeta  
> **`AdoptaAmigo/frontend`**

Instala las dependencias del proyecto React:

```bash
npm install
```

Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

El frontend se ejecutará por defecto en:

```
http://127.0.0.1:5173/
```
