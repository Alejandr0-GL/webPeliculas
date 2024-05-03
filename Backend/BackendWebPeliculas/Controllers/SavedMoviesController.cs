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
        public IActionResult GuardarPelicula([FromBody] Peliculas_Usuario pelicula)
        {
            string query = "INSERT INTO Peliculas_Usuario (idUsuario, idPelicula) VALUES (@idUsuario, @idPelicula)";
            clsDBConnection _DBConnection = new clsDBConnection();

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idUsuario", pelicula.idUsuario);
                command.Parameters.AddWithValue("@idPelicula", pelicula.idPelicula);

                try
                {
                    connection.Open();
                    int result = command.ExecuteNonQuery();
                    connection.Close();

                    if (result > 0)
                        return Ok(new { message = "Pelicula guardada correctamente" });
                    else
                        return BadRequest(new { message = "No se pudo guardar la pelicula" });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "Error en el servidor: " + ex.Message });
                }

            }

        }

        [HttpDelete("EliminarGuardadas")]
        public IActionResult EliminarPeliculaGuardada(int idUsuario, int idPelicula)
        {
            string query = "DELETE FROM Peliculas_Usuario WHERE idUsuario=@idUsuario AND idPelicula=@idPelicula";
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

                    return Ok(new { message = "Se eliminó la pelicula guardada correctamente" });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "Error al eliminar la película guardada: " + ex.Message });
                }

            }
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
