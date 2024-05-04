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

  // Métodos para cuando se da click en el boton ir a cierta pagina
  navIniciarSesionPage(){
    this.router.navigate(['/iniciarSesion']);
  }

  navPerfilPage(){
    this.router.navigate(['/perfil']);
  }

  navAdminUsuariosPage(){
    this.router.navigate(['/administrarUsuarios']);
  }

  navHome(){
    this.router.navigate(['home']);
  }

  regresar(){
    window.history.back();
  }

  cerrarSesion(){
    sessionStorage.removeItem('tokenGenerado')
    this.usuarioServ.isLoggedIn = false
    this.router.navigate(['/iniciarSesion']);
  }


}
