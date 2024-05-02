import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

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
  errorMensaje=''

  constructor(private usuarioServ:UsuarioService, private router:Router){}
  
  onSubmit(){
    this.usuarioServ.getAutenticacion(this.nombreUsuarioOEmail,this.password).subscribe(respuesta=>{
    console.log('LogIn exitoso')

      const tokenGenerado = respuesta.tokenGenerado
      sessionStorage.setItem('tokenGenerado', tokenGenerado);

    this.usuarioServ.onAutenticacionExitosa();
    this.isLoggedIn = true
    this.usuarioServ.esAdmin()
    
    
    this.router.navigate(['home']);
    
    },
    (error)=>{
      this.errorMensaje='Error al iniciar sesion, intente nuevamente'
      console.error('Login error',error)
    })
  }
  
  onClickIniciarSesion(){
      this.onSubmit();
    
  }

  navRegistrarsePage(){
    this.router.navigate(['/registrarse']);
  }

};

