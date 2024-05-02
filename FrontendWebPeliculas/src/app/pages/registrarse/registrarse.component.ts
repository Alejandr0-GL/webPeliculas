import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  nombreUsuario: string = '';
  email: string = '';
  password: string = '';
  rol: string = '';


  constructor(private router:Router, private usuarioServ:UsuarioService){}

  navIniciarSesionPage(){
    this.router.navigate(['/iniciarSesion']);
  }

  registrarUsuario(){
    const datosUsuario = {
      nombreUsuario: this.nombreUsuario,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    this.usuarioServ.registrarUsuario(datosUsuario).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente', response);
      },
      error: (error) => {
        console.error('Error registrando el usuario', error);
      }
    });

  }

}

