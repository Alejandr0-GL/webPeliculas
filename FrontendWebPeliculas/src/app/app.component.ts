import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendWebPeliculas';
  isLoggedIn: boolean = false
  
  constructor (public usuarioServ:UsuarioService){}

}
