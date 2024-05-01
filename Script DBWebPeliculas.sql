create database DBWebPeliculas
GO

use DBWebPeliculas

CREATE TABLE Usuarios (
	idUsuario INT IDENTITY(1,1) PRIMARY KEY,
	nombreUsuario VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(200) NOT NULL,
	rol varchar(30) NOT NULL
)

CREATE TABLE Peliculas_Usuario (
    idUsuario INT,
    idPelicula INT,
    PRIMARY KEY (idUsuario, idPelicula),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    --FOREIGN KEY (idPelicula) REFERENCES Peliculas(idPelicula)
)

-----------------------------------------------------------------

INSERT INTO Usuarios(nombreUsuario, email, password, rol) VALUES 
  ('admin', 'admin@admin.com', '1234', 'administrador'),
  ('user', 'user@user.com', '123', 'usuario')
