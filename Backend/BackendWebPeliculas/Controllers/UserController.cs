using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackendWebPeliculas.Classes;
using BackendWebPeliculas.Models;
using System.Data.SqlClient;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BackendWebPeliculas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region ADMINISTRAR USUARIO CRUD

        // GET Para usuarios, devuelve todos los usuarios en la DB
        [HttpGet("UsuariosALista")]
        public List<Usuario> MostrarUsuarios()
        {
            clsDBConnection _DBConnection = new clsDBConnection();
            List<Usuario> user = new List<Usuario>();
            string query = "SELECT * FROM Usuarios";
            

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        Usuario _User = new Usuario();
                        _User.idUsuario = Convert.ToInt32(reader[0]);
                        _User.nombreUsuario = reader.GetString(1);
                        _User.email = reader.GetString(2);
                        _User.password = reader.GetString(3);
                        _User.rol = reader.GetString(4);
                        user.Add(_User);
                    }
                    reader.Close();
                    connection.Close();
                    
                    return user;
                }
                catch (Exception ex)
                {
                    throw new Exception("Error: " + ex.Message);
                }

            }
        }

        // Metodo POST para ingresar usuario a la DB
        [HttpPost("IngresarUsuario")]
        public IActionResult InsertarUsuario([FromBody] Usuario usuario)
        {
            string query = "INSERT INTO Usuarios(nombreUsuario, email, password, rol) VALUES (@nombreUsuario, @email, @password, @rol)";
            clsDBConnection _DBConnection = new clsDBConnection();

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@nombreUsuario", usuario.nombreUsuario.ToLower());
                command.Parameters.AddWithValue("@email", usuario.email.ToLower());
                command.Parameters.AddWithValue("@password", usuario.password);
                command.Parameters.AddWithValue("@rol", usuario.rol);

                try
                {
                    connection.Open();
                    int result = command.ExecuteNonQuery();
                    connection.Close();

                    if (result > 0)
                        return Ok(new { message = "Usuario insertado correctamente." });
                    else
                        return BadRequest(new { message = "No se pudo insertar el usuario." });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "Error en el servidor: " + ex.Message });
                }

            }

        }


        //Metodo PUT para actualizar un usuario,
        [HttpPut("ActualizarUsuario")]
        public string ActualizarUsuario(int idUsuario, string nombreUsuario, string email, string password, string rol)
        {
            string query = "UPDATE Usuarios SET nombreUsuario=@nombreUsuario, email=@email, password=@password, rol=@rol WHERE idUsuario=@idUsuario";
            clsDBConnection _DBConnection = new clsDBConnection();

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idUsuario", idUsuario);
                command.Parameters.AddWithValue("@nombreUsuario", nombreUsuario);
                command.Parameters.AddWithValue("@email", email);
                command.Parameters.AddWithValue("@password", password);
                command.Parameters.AddWithValue("@rol", rol);

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();

                    connection.Close();

                    return "Se actualizó el usuario correctamente";
                }
                catch (Exception ex)
                {
                    throw new Exception("Error: " + ex.Message);
                }

            }


        }

        //Metodo DELETE para eliminar un usuario por su ID
        [HttpDelete("EliminarUsuario")]
        public string EliminarUsuario(int idUsuario)
        {
            string query = "DELETE FROM Usuarios WHERE idUsuario=@idUsuario";
            clsDBConnection _DBConnection = new clsDBConnection();

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idUsuario", idUsuario);

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();

                    connection.Close();

                    return "Se eliminó el usuario correctamente";
                }
                catch (Exception ex)
                {
                    throw new Exception("Error: " + ex.Message);
                }

            }
        }

        #endregion

        //Metodo para autenticar el usuario en el inicio de sesión, después de validar se genera un token
        [HttpGet("Autenticacion")]
        public IActionResult Autenticacion(string nombreUsuarioOEmail, string password)
        {
            string query = "SELECT idUsuario, nombreUsuario, email, password, rol FROM Usuarios WHERE ((LOWER(nombreUsuario)=@nombreUsuario OR LOWER(email)=@email) AND password=@password)";
            clsDBConnection _DBConnection = new clsDBConnection();

            nombreUsuarioOEmail = nombreUsuarioOEmail.ToLower().Trim();

            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@nombreUsuario", nombreUsuarioOEmail);
                command.Parameters.AddWithValue("@email", nombreUsuarioOEmail);
                command.Parameters.AddWithValue("@password", password);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    reader.Read();

                    if (!reader.HasRows)
                    {
                        reader.Close();
                        connection.Close();
                        return BadRequest(new { message = "Error al iniciar sesión, intente de nuevo o regístrese" });
                    }

                    Usuario _User = new Usuario();
                    _User.idUsuario = Convert.ToInt32(reader[0]);
                    _User.nombreUsuario = reader.GetString(1);
                    _User.email = reader.GetString(2);
                    _User.password = reader.GetString(3);
                    _User.rol = reader.GetString(4);

                    reader.Close();
                    connection.Close();

                    if ((_User.nombreUsuario == nombreUsuarioOEmail || _User.email == nombreUsuarioOEmail) && _User.password == password)
                    {
                        string tokenGenerado = GenerarToken(_User);
                        return Ok(new { message = "Se inició sesión correctamente", tokenGenerado  });
                    }
                    else
                    {
                        return BadRequest(new { message = "Error al iniciar sesión, intente de nuevo o regístrese" });
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "Error en el servidor: " + ex.Message });
                }
            }
        }



        //Metodo para generar token, se le envia el objeto User desde el metodo Autenticación
        [HttpGet("GenerarToken")]
        public string GenerarToken(Usuario _User)
        {
            JWT JWT = _configuration.GetSection("Jwt").Get<JWT>();

            Claim[] claims = new[]
            {
                            new Claim(JwtRegisteredClaimNames.Sub, JWT.Subject),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),

                            

                            // Almaceno los resultados de la base de datos
                            new Claim("idUsuarioToken", _User.idUsuario.ToString()),
                            new Claim("nombreUsuarioOEmailToken", _User.nombreUsuario),
                            new Claim("emailToken", _User.email),
                            new Claim("passwordToken", _User.password),
                            new Claim("rolToken", _User.rol),
                        };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWT.Key+"this is my secret key for authentication"));
            SigningCredentials signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken tokenInicio = new JwtSecurityToken(
                JWT.Issuer,
                JWT.Audience,
                claims,
                signingCredentials: signIn
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenInicio);
        }

        [HttpGet("Rol")]
        public IActionResult GetRolUsuario(int idUsuario)
        {
            clsDBConnection _DBConnection = new clsDBConnection();
            string query = "SELECT rol FROM Usuarios WHERE idUsuario=@idUsuario";
            Usuario _User = new Usuario();


            using (SqlConnection connection = new SqlConnection(_DBConnection.connectionString))
            {
                SqlCommand command = new SqlCommand(query, connection);
                command.Parameters.AddWithValue("@idUsuario", idUsuario);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        _User.rol = reader.GetString(0);
                        reader.Close();
                        connection.Close();
                        return Ok(new { rol = _User.rol });
                    }
                    else
                    {
                        reader.Close();
                        connection.Close();
                        return NotFound(new { message = "Usuario no encontrado" });
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { message = "Error en el servidor: " + ex.Message });
                }
            }
        }
    }
}