import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioALista } from '../../interfaces/usuarioALista.interface';
import { PostersPeliculasComponent } from '../../components/posters-peliculas/posters-peliculas.component';
import { PipesModule } from '../../pipes/pipes.module';
import { PeliculasGuardadas } from '../../interfaces/peliculasGuardadas.interface';
import { BuscarPeliculasComponent } from '../../components/buscar-peliculas/buscar-peliculas.component';
import { PeliculasBuscar } from '../../interfaces/peliculasBuscar.interface';
import { PeliculasGuardadasService } from '../../services/peliculas-guardadas.service';
import { PeliculasService } from '../../services/peliculas.service';
import { DetallesPelicula } from '../../interfaces/detalles.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, PipesModule, BuscarPeliculasComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  peliculasVacio=''
  peliculasBuscar: any
  

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private peliculasGuardadasServ:PeliculasGuardadasService, private peliculasServ:PeliculasService, private usuarioServ:UsuarioService){}
  
  

  ngOnInit(): void {

    const idUsuario = this.usuarioServ.getIdUsuarioToken();
    
    this.peliculasGuardadasServ.getPeliculasGuardadas(idUsuario).subscribe(peliculasGuardadas => {

      console.log(peliculasGuardadas)

      if(peliculasGuardadas.length === 0){
        this.peliculasVacio = 'No tienes peliculas guardadas'
        return
      }

      const observables = peliculasGuardadas.map(peliculaGuardada=>
        this.peliculasServ.getDetallesPelicula(peliculaGuardada.idPelicula)
      );

      forkJoin(observables).subscribe(detallesPeliculas=>{
        console.log('Detalles de peliculas guardadas: ', detallesPeliculas);
        this.peliculasBuscar = detallesPeliculas;

        
      })
    });

    

  }

  regresar(){
    window.history.back();
  }

  onClickPelicula(peliculasGuardadas:PeliculasGuardadas){
    this.router.navigate(['/pelicula', peliculasGuardadas.idPelicula])
  }

 
  
}
