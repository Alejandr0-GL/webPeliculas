using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using System.Data.SqlClient;
using BackendWebPeliculas.Models;

public class clsDBConnection
{

    public string connectionString = "Server=localhost;Database=DBWebPeliculas;Integrated Security=True;";
    public bool ConnectDB()
    {
        try
        {
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            connection.Close();
        }
        catch (Exception ex)
        {
            return false;
        }
        return true;
    }




}

