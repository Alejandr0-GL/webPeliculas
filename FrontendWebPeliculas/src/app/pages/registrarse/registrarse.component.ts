import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  nombreUsuario: string = '';
  email: string = '';
  password: string = '';
  rol: string = '';
  Mensaje= '';


  constructor(private router:Router, private usuarioServ:UsuarioService){}

  navIniciarSesionPage(){
    this.router.navigate(['/iniciarSesion']);
  }

  registrarUsuario(){
    const usuario = {
      nombreUsuario: this.nombreUsuario,
      email: this.email,
      password: this.password,
      rol: "usuario"
    };

    this.usuarioServ.registrarUsuario(usuario).subscribe({
      next: (response) => {
        this.Mensaje= 'Usuario registrado exitosamente';
        this.navIniciarSesionPage();
      },
      error: (error) => {
        this.Mensaje= 'Error registrando el usuario, compruebe los datos de inicio e intente de nuevo';
      }
    });

  }

}

