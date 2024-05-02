import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioALista } from '../../interfaces/usuarioALista.interface';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuario?:UsuarioALista

  constructor(private activatedRoute:ActivatedRoute, private usuariosServ:UsuarioService){}

  regresar(){
    window.history.back();
  }
}
