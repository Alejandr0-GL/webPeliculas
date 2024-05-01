Web Peliculas

Para ejecutar:
  - Ejecuta el script DBWebPeliculas, importante realizar la conexion a la base de datos en localhost y con Windows Authentication
  - Ejecutar el .sln BackendWebPeliculas, esto abrira Swagger, donde se puede ver la documentación de las APIs
  - Abrir la carpeta Frontend desde un IDE
  - En la terminal ejecutar el comando ng s y pegar la URL que nos aparece en el navegador

Uso:
  - La app incluye una pagina inicial en la que trae las peliculas populares desde la API publica TMDB, podemos ver los detalles de cada pelicula
    si damos click en su poster, también es posible buscar peliculas por su titulo.
    
  - La app nos deja iniciar sesión, esto porque en un futuro se implementara la opción de "Guardar peliculas" en el perfil de cada usuario y poder
    gestionarlas, de momento no esta terminada.

  - Todavia no se puede hacer el registro, por lo que los unicos 2 perfiles disponibles son:
    - 1) nombre de usuario: admin //
           password: 1234
    - 2) nombre de usuario: user //
           password: 123
    
  - En un futuro se implementara la opcion de "Gestionar usuarios", con el boton que solo aparece si se inicia como administrador


Observaciones:

  - Frontend:
    - Algunas paginas ya estan terminadas pero no tienen funcionalidad ya que no se conectan de momento al backend

  - Backend:
    - Hay muchos servicios ya terminados, pero no se alcanzaron a conectar con el frontend, en un futuro estas funcionalidades estaran disponibles

Estado del proyecto

Frontend (Angular):
  - Implementar un sistema de autenticación que permita a los usuarios registrarse, iniciar sesión y cerrar sesión. (En proceso)
  - Crear una página de inicio que muestre una lista de películas populares. (Terminado)
  - Permitir a los usuarios buscar películas por título. (Terminado)
  - Mostrar detalles de una película seleccionada cuando se hace clic en ella. (Terminado)
  - Permitir a los usuarios guardar películas en su perfil cuando estén autenticados. (En proceso)
  - Crear una página en el perfil del usuario donde se muestren las películas guardadas por el usuario. (En proceso)
  - Crear una pagina en el perfil de administrador en donde pueda administrar los usuarios, incluyendo visualización, creación, edición y eliminación de usuarios. (En proceso)
  - Utilizar enrutamiento para navegar entre las páginas. (Terminado)
  - Implementar un servicio Angular para conectarse al backend de .NET Core. (En proceso)

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
 
