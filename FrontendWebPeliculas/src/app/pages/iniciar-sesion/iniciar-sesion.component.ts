import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent{

  isLoggedIn = false
  nombreUsuarioOEmail=''
  password=''
  Mensaje=''

  constructor(private usuarioServ:UsuarioService, private router:Router){}
  
  onSubmit(){
    //Autentica y genera el token si las credenciales son correctas
    this.usuarioServ.getAutenticacion(this.nombreUsuarioOEmail,this.password).subscribe(respuesta=>{

      const tokenGenerado = respuesta.tokenGenerado
      sessionStorage.setItem('tokenGenerado', tokenGenerado); //Almacena token en sessionStorage para usarlo en otras funcionalidades

    this.usuarioServ.onAutenticacionExitosa(); //Cambia la variable isLoggedIn a true
    this.isLoggedIn = true
    this.usuarioServ.esAdmin()
    
    
    this.router.navigate(['home']);
    
    },
    (error)=>{
      this.Mensaje='Credenciales incorrectas'
      console.error('Login error',error)
    })
  }

  navRegistrarsePage(){
    this.router.navigate(['/registrarse']);
  }

};

