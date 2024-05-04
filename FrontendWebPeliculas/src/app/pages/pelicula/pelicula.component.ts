import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { CommonModule } from '@angular/common';
import { DetallesPelicula } from '../../interfaces/detalles.interface';
import { PipesModule } from '../../pipes/pipes.module';
import { UsuarioService } from '../../services/usuario.service';
import { PeliculasGuardadasService } from '../../services/peliculas-guardadas.service';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent implements OnInit {
  
  pelicula?:DetallesPelicula
  idUsuario:string = ''
  Mensaje:string = ''

  constructor(private activatedRoute:ActivatedRoute, private peliculasServ:PeliculasService, private usuarioServ:UsuarioService, private PeliculasGuardadasServ:PeliculasGuardadasService){}
  
  ngOnInit(){
    const {idPelicula} = this.activatedRoute.snapshot.params
    this.peliculasServ.getDetallesPelicula(idPelicula).subscribe(pelicula=>{

      if(pelicula === null){
        console.error('Detalles de pelicula no encontrados')
        return
      }

      this.pelicula=pelicula

    })
  }

  agregarAlPerfil(){
    const {idPelicula} = this.activatedRoute.snapshot.params
    
    const pelicula = {
      idUsuario: this.usuarioServ.getIdUsuarioToken(),
      idPelicula
    };

    this.PeliculasGuardadasServ.agregarPelicula(pelicula).subscribe({
      next: (Response) => {
        this.Mensaje= 'Pelicula agregada correctamente';
      },
      error: (error) => {
        this.Mensaje = 'Esta pelicula ya se encuentra agregada'
        console.log(this.Mensaje), error
      }
    })

  }

  eliminarPeliculaGuardada(){
    this.idUsuario = this.usuarioServ.getIdUsuarioToken()
    const {idPelicula} = this.activatedRoute.snapshot.params

    this.PeliculasGuardadasServ.eliminarPeliculaGuardada(this.idUsuario, idPelicula).subscribe({
      next: (Response) => {
        this.Mensaje= 'Pelicula eliminada correctamente';
      },
      error: (error) => {
        this.Mensaje = 'Error al eliminar la pelicula'
        console.error('error al eliminar: ', error)
      }
    })
  }

  regresar(){
    window.history.back();
  }
}
