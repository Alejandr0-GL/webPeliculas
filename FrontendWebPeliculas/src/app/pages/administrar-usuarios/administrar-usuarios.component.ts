import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-administrar-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrar-usuarios.component.html',
  styleUrl: './administrar-usuarios.component.css'
})
export class AdministrarUsuariosComponent {

  regresar(){
    window.history.back();
  }

}
