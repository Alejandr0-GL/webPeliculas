import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { PipesModule } from '../../pipes/pipes.module';
import { PeliculasGuardadas } from '../../interfaces/peliculasGuardadas.interface';
import { BuscarPeliculasComponent } from '../../components/buscar-peliculas/buscar-peliculas.component';
import { PeliculasGuardadasService } from '../../services/peliculas-guardadas.service';
import { PeliculasService } from '../../services/peliculas.service';
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

    //Obtiene id desde el token
    const idUsuario = this.usuarioServ.getIdUsuarioToken();
    
    this.peliculasGuardadasServ.getPeliculasGuardadas(idUsuario).subscribe(peliculasGuardadas => {

      if(peliculasGuardadas.length === 0){
        this.peliculasVacio = 'No tienes peliculas guardadas'
        return
      }

      const observables = peliculasGuardadas.map(peliculaGuardada=>
        this.peliculasServ.getDetallesPelicula(peliculaGuardada.idPelicula)
      );

      //ForkJoin al ser varios observables
      forkJoin(observables).subscribe(detallesPeliculas=>{
        this.peliculasBuscar = detallesPeliculas;
      })
    });
  }


  //Navegación---------------
  
  regresar(){
    window.history.back();
  }

  onClickPelicula(peliculasGuardadas:PeliculasGuardadas){
    this.router.navigate(['/pelicula', peliculasGuardadas.idPelicula])
  }
}
