import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { CommonModule } from '@angular/common';
import { DetallesPelicula } from '../../interfaces/detalles.interface';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent implements OnInit {
  
  pelicula?:DetallesPelicula

  constructor(private activatedRoute:ActivatedRoute, private peliculasServ:PeliculasService){}
  
  ngOnInit(){
    const {movieID} = this.activatedRoute.snapshot.params

    this.peliculasServ.getDetallesPelicula(movieID).subscribe(pelicula=>{

      console.log(pelicula)

      if(pelicula === null){
        console.error('Detalles de pelicula no encontrados')
        return
      }

      this.pelicula=pelicula

    })
  }

  regresar(){
    window.history.back();
  }

  
}
