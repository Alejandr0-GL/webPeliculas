Web Peliculas

Para ejecutar:
  - Ejecuta el script DBWebPeliculas, importante realizar la conexion a la base de datos en localhost y con Windows Authentication.
  - Ejecutar el .sln BackendWebPeliculas, esto abrira Swagger, donde se puede ver la documentación de las APIs.
  - Abrir la carpeta FrontendWebPeliculas desde un IDE.
  - En la terminal ejecutar el comando _ng serve_ y abrir _localhost:4200_

Uso:
  - La app incluye una pagina inicial en la que trae las peliculas populares desde la API publica TMDB, podemos ver los detalles de cada pelicula
    si damos click en su poster, también es posible buscar peliculas por su titulo.
    
  - La app permite registrarse, iniciar y cerrar sesion.
    
  - La app permite a cada usuario guardar peliculas, las peliculas guardadas se pueden ver en el apartado "Perfil" arriba a la derecha despues de estar autenticado, también permite borrarlas.
    
- La app permite gestionar usuarios si se ingresa con un perfil "Administrador", con el boton de arriba a la izquierda se accede a la pagina de "Administrar usuarios", en esta pagina se puede:
    - Ver los usuarios que hay registrados.
    - Añadir un nuevo usuario, solo un usuario administrador puede elegir el rol de los usuarios que quiere agregar.
    - Actualizar información de un usuario en especifico.
    - Eliminar un usuario.
     
Estado del proyecto

Frontend (Angular):
  - Implementar un sistema de autenticación que permita a los usuarios registrarse, iniciar sesión y cerrar sesión. (Terminado)
  - Crear una página de inicio que muestre una lista de películas populares. (Terminado)
  - Permitir a los usuarios buscar películas por título. (Terminado)
  - Mostrar detalles de una película seleccionada cuando se hace clic en ella. (Terminado)
  - Permitir a los usuarios guardar películas en su perfil cuando estén autenticados. (Terminado)
  - Crear una página en el perfil del usuario donde se muestren las películas guardadas por el usuario. (Terminado)
  - Crear una pagina en el perfil de administrador en donde pueda administrar los usuarios, incluyendo visualización, creación, edición y eliminación de usuarios. (Terminado)
  - Utilizar enrutamiento para navegar entre las páginas. (Terminado)
  - Implementar un servicio Angular para conectarse al backend de .NET Core. (Terminado)

Backend (.NET CORE):
  - Crear un API RESTful que proporcione endpoints para:
    - Registro de usuarios. (Terminado)
    - Inicio de sesión de usuarios. (Terminado)
    - Administración de usuarios CRUD. (Terminado)
    - Obtener una lista de películas populares desde la API pública de películas. (Terminado)
    - Buscar películas por título desde la API pública de películas. (Terminado)
    - Obtener detalles de una película por su ID desde la API pública de películas. (Terminado)
    - Almacenar información de usuario y películas guardadas en una base de datos (Terminado)
    - Obtener la lista de películas guardadas por el usuario autenticado. (Terminado)

 - Conectar el API de películas a través del backend y el Fronted al backend. (Terminado)
 
