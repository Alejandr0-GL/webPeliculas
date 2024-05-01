using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;


namespace BackendWebPeliculas.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class PruebaController : ControllerBase
    {
        [HttpGet(Name = "GetPrueba")]
        public bool Get()
        {
            clsDBConnection _DBConnection = new clsDBConnection();
            return _DBConnection.ConnectDB();
        }
    }
}
