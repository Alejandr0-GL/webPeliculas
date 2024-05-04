import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { PeliculasPopulares } from '../interfaces/peliculasPopulares.interface';
import { PeliculasBuscar } from '../interfaces/peliculasBuscar.interface';
import { DetallesPelicula } from '../interfaces/detalles.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiURL = 'https://localhost:7290/api/Movies/';

  constructor(private http:HttpClient) { }

  getPeliculasPopulares():Observable<PeliculasPopulares[]>{
    return this.http.get<PeliculasPopulares>(`${this.apiURL}Popular`).pipe(
      map((Response:any)=> Response.results)
    );
  }
  
  getPeliculasBuscar(txtBuscar:string):Observable<PeliculasBuscar[]>{
    return this.http.get<PeliculasBuscar>(`${this.apiURL}SearchByTitle?title=${txtBuscar}`).pipe(
      map(respuesta=>respuesta.results)
    );
  }

  getDetallesPelicula(movieID:string){
    return this.http.get<DetallesPelicula>(`${this.apiURL}DetailsByID?movieID=${movieID}`).pipe(
      catchError(error=> of(null))
    );

  }

}
