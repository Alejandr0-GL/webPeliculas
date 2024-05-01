create database DBWebPeliculas
GO

use DBWebPeliculas

CREATE TABLE Roles (
	idRol INT PRIMARY KEY,
	nombreRol varchar(50) NOT NULL
)

--CREATE TABLE Peliculas (
--    idPelicula INT NOT NULL PRIMARY KEY,
--    nombrePelicula VARCHAR(100) NOT NULL,
--    descripcion TEXT,
--    añoLanzamiento INT
--)

CREATE TABLE Usuarios (
	idUsuario INT IDENTITY(1,1) PRIMARY KEY,
	nombreUsuario VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(200) NOT NULL,
	rol varchar(30) NOT NULL
)

--CREATE TABLE Peliculas_Usuario (
--    idUsuario INT,
--    idPelicula INT,
--    PRIMARY KEY (idUsuario, idPelicula),
--    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
--    --FOREIGN KEY (idPelicula) REFERENCES Peliculas(idPelicula)
--)
--
--
--CREATE TABLE Usuarios_Roles (
--    idUsuario INT,
--    idRol INT,
--    PRIMARY KEY (idUsuario, idRol),
--    FOREIGN KEY (idUsuario) REFERENCES Usuarios (idUsuario),
--    FOREIGN KEY (idRol) REFERENCES Roles (idRol)
--)
--
--CREATE TABLE Modulos (
--	idModulo INT PRIMARY KEY,
--	nombreModulo VARCHAR(50) NOT NULL 
--)
--
--CREATE TABLE Acciones (
--	idAccion INT PRIMARY KEY,
--	nombreAccion VARCHAR(50) NOT NULL
--)
--
--CREATE TABLE Roles_Acciones (
--	idRol INT NOT NULL,
--	idAccion INT NOT NULL
--  PRIMARY KEY (idRol, idAccion),
--	FOREIGN KEY (idRol) REFERENCES Roles (idRol),
--	FOREIGN KEY (idAccion) REFERENCES Acciones (idAccion)
--)
--
--CREATE TABLE Acciones_Modulos (
--    idAccion INT,
--    idModulo INT,
--    PRIMARY KEY (idAccion, idModulo),
--    FOREIGN KEY (idAccion) REFERENCES Acciones(idAccion),
--    FOREIGN KEY (idModulo) REFERENCES Modulos(idModulo)
--)

-----------------------------------------------------------------

INSERT INTO Usuarios(nombreUsuario, email, password) VALUES 
  ('admin', 'admin@admin.com', '1234'),
  ('user', 'user@user.com', '123')

INSERT INTO Modulos (idModulo, nombreModulo) VALUES
(1, 'Autenticación'),
(2, 'Películas'),
(3, 'Perfil de Usuario'),
(4, 'Perfil de Administrador')

INSERT INTO Acciones (idAccion, nombreAccion) VALUES
(1, 'Registrar Usuario'),
(2, 'Iniciar Sesión'),
(3, 'Buscar Películas'),
(4, 'Guardar Película'),
(5, 'Ver Películas Guardadas'),
(6, 'Administrar Usuarios')

INSERT INTO Roles (idRol, nombreRol)VALUES
(1, 'Administrador'),
(2, 'Usuario_Comun')

INSERT INTO Usuarios_Roles VALUES
(1, 1),
(2, 2),
(5, 2)
