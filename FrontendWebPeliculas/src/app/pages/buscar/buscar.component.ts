import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasBuscar } from '../../interfaces/peliculasBuscar.interface';
import { PeliculasService } from '../../services/peliculas.service';
import { BuscarPeliculasComponent } from '../../components/buscar-peliculas/buscar-peliculas.component';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, BuscarPeliculasComponent],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit{

  txtBuscar=''
  peliculasBuscar:PeliculasBuscar[]=[]
  peliculasVacio=''

  constructor(private activatedRoute:ActivatedRoute, private peliculasServ:PeliculasService){}

  //Recoge el txtBuscar de la url y se lo envía a getPeliculasBuscar
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{

      this.txtBuscar=params['txtBuscar'];

      this.peliculasServ.getPeliculasBuscar(this.txtBuscar).subscribe(peliculasBuscar=>{
        this.peliculasBuscar=peliculasBuscar

        if(this.peliculasBuscar.length===0){
          this.peliculasVacio='No se encontró ninguna pelicula'
        }
      })
    })
  }

}
