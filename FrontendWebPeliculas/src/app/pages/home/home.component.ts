import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { PeliculasPopulares } from '../../interfaces/peliculasPopulares.interface';
import { PostersPeliculasComponent } from '../../components/posters-peliculas/posters-peliculas.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, PostersPeliculasComponent, NavbarComponent]
})
export class HomeComponent implements OnInit{

  peliculasPopulares:PeliculasPopulares[]=[];

  constructor(private peliculasServ: PeliculasService){}

  ngOnInit(): void {
      this.cargarPeliculas()
  }


  //Metodo para cargar las peliculas populares
  cargarPeliculas(){
    this.peliculasServ.getPeliculasPopulares().subscribe(respuesta=>{
      this.peliculasPopulares = respuesta;
    })
  };
}

