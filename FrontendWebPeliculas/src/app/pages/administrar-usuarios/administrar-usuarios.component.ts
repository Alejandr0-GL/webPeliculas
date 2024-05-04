import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar-usuarios',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],  //Imports para usar angular material
  templateUrl: './administrar-usuarios.component.html',
  styleUrl: './administrar-usuarios.component.css'
})
export class AdministrarUsuariosComponent {

  private usuarioServ = inject(UsuarioService)
  public listaUsuario:Usuario[]=[]
  public displayedColumns:string[] = ['idUsuario', 'nombreUsuario', 'email', 'password', 'rol', 'accion']

  constructor(private router:Router){
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioServ.getUsuarios().subscribe({
      next:(data)=>{
          this.listaUsuario = data
      },
      error:(error)=>{
        console.log('Error al traer los usuarios', error)
      }
    })
  }

  crearUsuario(){
    this.router.navigate(['/ingresarUsuario'])     
  }

  editarUsuario(objeto:Usuario){
    this.router.navigate(['/actualizarUsuario', objeto.idUsuario])
  }

  eliminarUsuario(objeto:Usuario){
    if(confirm('Desea eliminar el usuario '+ objeto.nombreUsuario)){
      this.usuarioServ.eliminarUsuario(objeto.idUsuario.toString()).subscribe({
        next:(data)=>{
          this.getUsuarios()
        },
        error:(error)=>{
          console.log('Error al eliminar el usuarios', error)
        }
      })

      
    }
  }




  regresar(){
    window.history.back();
  }

}
