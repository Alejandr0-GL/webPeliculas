import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasGuardadasService {

  private apiURL = 'https://localhost:7290/api/SavedMovies/';

  constructor(private http:HttpClient) { }

  getPeliculasGuardadas(idUsuario:string){
    return this.http.get<any>(`${this.apiURL}VerPeliculasGuardadas?idUsuario=${idUsuario}`)
  }

  agregarPelicula(pelicula: {idUsuario:string, idPelicula:string}):Observable<any>{
    return this.http.post(`${this.apiURL}GuardarPelicula`, pelicula)
  }

  eliminarPeliculaGuardada(idUsuario:string, idPelicula:string){
    return this.http.delete(`${this.apiURL}EliminarGuardadas?idUsuario=${idUsuario}&idPelicula=${idPelicula}`)
  }
}

