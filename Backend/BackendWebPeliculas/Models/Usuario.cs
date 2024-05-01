namespace BackendWebPeliculas.Models
{
    public class Usuario
    {
        public int idUsuario {  get; set; } 
        public string? nombreUsuario { get; set; }
        public string? email { get; set; }
        public string password { get; set; }
        public string rol { get; set; }
    }
}
