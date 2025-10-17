# **🧪 Prueba Técnica Frontend**

## 🎯 Descripción

Desarrollar una aplicación en **React** que consuma la API pública [**Rick and Morty API**](https://rickandmortyapi.com/) para mostrar información sobre los personajes de la serie.

La aplicación debe incluir:

* Una funcionalidad para **marcar personajes como favoritos**.
* Una sección dedicada para **visualizar los favoritos**.
* **Persistencia de datos**, garantizando que los favoritos se mantengan al recargar la página.

---

## ⚙️ Requisitos Funcionales

### 👥 Lista de Personajes

Mostrar una **lista paginada** de personajes obtenidos desde:
🔗 [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character)

Cada tarjeta de personaje debe contener:

* 🧍 **Nombre**
* 🖼️ **Imagen**
* 💀 **Estado:** vivo, muerto o desconocido
* 👽 **Especie**
* ⭐ **Botón** para agregar o eliminar de favoritos

---

### ⭐ Favoritos

* Permitir marcar personajes como **favoritos** directamente desde la lista principal.
* Incluir una **página exclusiva** (`/favorites`) que muestre solo los personajes favoritos.
* Garantizar la **persistencia** de los favoritos al actualizar o cerrar la aplicación.

---

### 🔍 Filtrado y Búsqueda

Incluir herramientas para mejorar la exploración de personajes:

* Filtros por:

  * **Estado:** vivo, muerto o desconocido.
  * **Especie.**
* **Barra de búsqueda** para localizar personajes por nombre.

---

### 📄 Paginación

Implementar la **paginación** utilizando el parámetro `page` que ofrece la API, para navegar entre conjuntos de personajes.

---

## 🧰 Requisitos Técnicos

### 🧩 TypeScript *(opcional)*

Si se utiliza, deben tiparse todos los **componentes**, **props**, **estados** y demás elementos del proyecto.

### 🔄 Gestión de Estado

Implementar un sistema de **gestión de estado global** para controlar:

* Los personajes marcados como favoritos.
* Los filtros y parámetros de búsqueda.

### 🧱 HTML Semántico

Usar etiquetas semánticas como:

```html
<header>, <main>, <section>, <article>
```

### 🎨 CSS / SCSS

El diseño es **libre**, pero debe cumplir con las siguientes condiciones:

* **Responsivo**, adaptado a distintos dispositivos.
* Interfaz **clara y ordenada**.

### 🗺️ Enrutamiento

Configurar las rutas principales mediante **React Router**:
1️⃣ `/` → Lista de personajes
2️⃣ `/favorites` → Lista de personajes favoritos

También se debe incluir una ruta para manejar **errores 404** o páginas inexistentes.
