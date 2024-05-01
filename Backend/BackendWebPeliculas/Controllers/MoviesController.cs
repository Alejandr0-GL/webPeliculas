using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;
using System.Net.Http;
using System;
using System.Web.Http.Cors;

namespace BackendWebPeliculas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private const string ApiKey = "0ddfc9981d9c5caff08e241406184400";

        public MoviesController()
        {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://api.themoviedb.org/3/");
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
        }


        [HttpGet("Popular")]
        public string GetPopularMovies()
        {
            try
            {
                HttpResponseMessage response = _httpClient.GetAsync($"movie/popular?api_key={ApiKey}&language=es-ES").Result;
                response.EnsureSuccessStatusCode();
                return response.Content.ReadAsStringAsync().Result;
            }
            catch (HttpRequestException ex)
            {
                // Manejo de errores
                return $"Error al hacer la solicitud HTTP: {ex.Message}";
            }
        }

        [HttpGet("SearchByTitle")]
        public string GetMoviesByTitle(string title)
        {
            try
            {
                HttpResponseMessage response = _httpClient.GetAsync($"search/movie?api_key={ApiKey}&query=" + title).Result;
                response.EnsureSuccessStatusCode();
                return response.Content.ReadAsStringAsync().Result;
            }
            catch (HttpRequestException ex)
            {
                // Manejo de errores
                return $"Error al hacer la solicitud HTTP: {ex.Message}"; // Devolver un error HTTP 500 en caso de fallo
            }
        }

        [HttpGet("DetailsByID")]
        public string GetDetailsByID(int movieID)
        {
            try
            {
                
                HttpResponseMessage response = _httpClient.GetAsync($"movie/{movieID}?api_key={ApiKey}&language=es-ES").Result;
                response.EnsureSuccessStatusCode();
                return response.Content.ReadAsStringAsync().Result;
            }
            catch (HttpRequestException ex)
            {
                // Manejo de errores
                return $"Error al hacer la solicitud HTTP: {ex.Message}"; // Devolver un error HTTP 500 en caso de fallo
            }
        }
    }
}
