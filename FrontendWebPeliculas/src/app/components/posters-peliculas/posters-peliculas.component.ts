import { Component, Input } from '@angular/core';
import { PeliculasPopulares } from '../../interfaces/peliculasPopulares.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PeliculasBuscar } from '../../interfaces/peliculasBuscar.interface';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'app-posters-peliculas',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './posters-peliculas.component.html',
  styleUrl: './posters-peliculas.component.css'
})
export class PostersPeliculasComponent {

  @Input() peliculasPopulares?: PeliculasPopulares[];

  constructor(private router:Router){}

  onClickPelicula(PeliculasPopulares:PeliculasPopulares){
    this.router.navigate(['/pelicula', PeliculasPopulares.id])
  }

  

}


