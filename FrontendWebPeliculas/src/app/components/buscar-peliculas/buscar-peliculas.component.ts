import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PeliculasBuscar } from '../../interfaces/peliculasBuscar.interface';
import { PipesModule } from '../../pipes/pipes.module';


@Component({
  selector: 'app-buscar-peliculas',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './buscar-peliculas.component.html',
  styleUrl: './buscar-peliculas.component.css'
})
export class BuscarPeliculasComponent {

  @Input() peliculasBuscar?: PeliculasBuscar[];

  constructor(private router:Router){}

  onClickPelicula(PeliculasBuscar:PeliculasBuscar){
    this.router.navigate(['/pelicula', PeliculasBuscar.id])
  }
}
