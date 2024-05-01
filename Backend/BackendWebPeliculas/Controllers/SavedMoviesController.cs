using BackendWebPeliculas.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Newtonsoft;
using Newtonsoft.Json.Linq;

namespace BackendWebPeliculas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedMoviesController : ControllerBase
    {
        [HttpPost("GuardarPelicula")]
        public string GuardarPelicula(int idUsuario, int idPelicula)
        {
            string query = "INSERT INTO Peliculas_Usuario (idUsuario, idPelicula) VALUES (@idUsuario, @idPelicula)";
            clsDBConnection _DBConnection = new clsDBConnection();

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idUsuario", idUsuario);
                command.Parameters.AddWithValue("@idPelicula", idPelicula);

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();

                    connection.Close();

                    return "Se guardó la película correctamente";
                }
                catch (Exception ex)
                {
                    throw new Exception("Error: " + ex.Message);
                }

            }

        }

        [HttpDelete("EliminarGuardadas")]
        public string EliminarPeliculaGuardada(int idPelicula)
        {

            return "";
        }

        [HttpGet("VerPeliculasGuardadas")]
        public List<Peliculas_Usuario> VerPeliculasGuardadas(int idUsuario)
        {
            MoviesController moviesController = new MoviesController(); 
            List<Peliculas_Usuario> ListaPeliculas = new List<Peliculas_Usuario>();

            string query = "SELECT * FROM Peliculas_Usuario WHERE idUsuario=@idUsuario";
            clsDBConnection _DBConnection = new clsDBConnection();

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idUsuario", idUsuario);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        Peliculas_Usuario _PeliculasUsuario = new Peliculas_Usuario();
                        _PeliculasUsuario.idUsuario = Convert.ToInt32(reader[0]);
                        _PeliculasUsuario.idPelicula = Convert.ToInt32(reader[1]);
                        ListaPeliculas.Add(_PeliculasUsuario);
                    }
                    reader.Close();
                    connection.Close();

                    foreach (Peliculas_Usuario _PeliculasUsuario in ListaPeliculas)
                    {
                        _PeliculasUsuario.detallesPelicula = moviesController.GetDetailsByID(_PeliculasUsuario.idPelicula);  //Lo devuelve con / como caracter de escape

                    }

                    return ListaPeliculas;
                }
                catch (Exception ex)
                {
                    throw new Exception("Error: " + ex.Message);
                }
            }
        }
    }
}
