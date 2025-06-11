# Bootcamp: CoderHouse

## Curso: Backend 2 Avanzado 

### Comisión: 75255

### Alumno: César David Vallejos

# Primera Pre-Entrega

## App Backend para Tienda E-commerce

Desarrollo del backend para una tienda en línea perteneciente al segundo tramo para el desarrollo de una tienda en linea.

## Temas implementados:

- **Gestor de vistas con Handlebars:** Se implementó Handlebars como motor de plantillas, configurado con Express-Handlebars para su integración con la aplicación. 
- **Persistencia:** Se implementó MongoDb para el resguardo de los datos en la nube. Usuarios y productos. 
- **Funcionalidad:** Se implementó CRUD para usuarios y productos. 


## Funcionamiento de la tienda:

La aplicación consiste en un servidor Express que funciona como backend de una tienda e-commerce.

### Vistas disponibles:

- `**/products**`: Muestra los productos disponibles en formato de tarjetas, obtenidos desde un archivo de persistencia en formato `.json`.
- `**/realTimeProducts**`: Similar a la vista anterior, pero con funcionalidades adicionales:
    - Cada producto tiene un botón para eliminarlo.    
    - La página se actualiza automáticamente al eliminar un producto.
    - Se incluye un formulario para agregar nuevos productos, los cuales se reflejan en la página en tiempo real.

### Configuración de sevidor (app.js):

El backend se desarrolla con **Express.js**, configurado en el archivo `app.js`. Se utilizan módulos y librerías esenciales:

- `express`: Para manejar las rutas y middleware. 
- `express-handlebars`: Para renderizar las vistas con Handlebars.  
- `ProductsManager`: Clase que gestiona los productos en la tienda.