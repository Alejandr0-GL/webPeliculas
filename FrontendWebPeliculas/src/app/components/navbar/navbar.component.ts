import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IniciarSesionComponent } from '../../pages/iniciar-sesion/iniciar-sesion.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IniciarSesionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn = false

  constructor(private router:Router, public usuarioServ:UsuarioService){}

  ngOnInit(): void {
    
  }

  buscarPelicula(textoABuscar:string){

    textoABuscar = textoABuscar.trim()
    if (textoABuscar.length === 0){
      return;
    }

    this.router.navigate(['/buscar', textoABuscar])

  }

  navIniciarSesionPage(){
    this.router.navigate(['/iniciarSesion']);
  }

  navPerfilPage(){
    this.router.navigate(['/perfil']);
  }

  navAdminUsuariosPage(){
    this.router.navigate(['/administrarUsuarios']);
  }

}
