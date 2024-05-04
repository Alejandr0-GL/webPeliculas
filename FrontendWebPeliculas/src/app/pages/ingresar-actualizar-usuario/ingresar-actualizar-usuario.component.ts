import { Component, Input, OnInit, inject } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';


@Component({
  selector: 'app-ingresar-actualizar-usuario',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './ingresar-actualizar-usuario.component.html',
  styleUrl: './ingresar-actualizar-usuario.component.css'
})
export class IngresarActualizarUsuarioComponent implements OnInit{

  @Input('idUsuario')idUsuario!: number

  private usuarioServ = inject(UsuarioService)

  public formBuild = inject(FormBuilder)

  //Inicializa formUsuario con esos parámetros
  public formUsuario:FormGroup = this.formBuild.group({
    idUsuario:[0],
    nombreUsuario:[],
    email:[],
    password:[],
    rol:[]
  })

  constructor(private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {

    const {idUsuario} = this.activatedRoute.snapshot.params

    //Si es diferente de null es porque se va a actualizar un usuario
    if(idUsuario != null){
      this.usuarioServ.getUsuarioPorID(idUsuario).subscribe({
        next:(data)=>{
          this.formUsuario.patchValue({
            idUsuario:data.idUsuario,
            nombreUsuario:data.nombreUsuario,
            email:data.email,
            password:data.password,
            rol:data.rol
          })
        },
        error:(error)=>{
          console.log('Error al obtener el usuario', error)
        }
      })
    }
  }

  guardarCambios(){
    //Trae idUsuario desde la URL
    const {idUsuario} = this.activatedRoute.snapshot.params
    const usuario:Usuario = {
      idUsuario: idUsuario,
      nombreUsuario:this.formUsuario.value.nombreUsuario,
      email:this.formUsuario.value.email,
      password:this.formUsuario.value.password,
      rol:this.formUsuario.value.rol
    }

    //Undefined cuando la URL no trae parámetro, porque se quiere agregar uno nuevo
    if(idUsuario === undefined){
      this.usuarioServ.registrarUsuario(usuario).subscribe({
        next:(data)=>{
          console.log('Usuario creado correctamente')
          this.router.navigate(['/administrarUsuarios'])
        },
        error:(error)=>{
          console.log('Error al crear el usuario', error)
        }
      })
    }
    else{
      this.usuarioServ.actualizarUsuario(usuario).subscribe({
        next:(data)=>{
          console.log('Usuario editado correctamente')
          this.router.navigate(['/administrarUsuarios'])
        },
        error:(error)=>{
          console.log('Error al editar el usuario', error)
        }
      })
    }

  }

  regresar(){
    window.history.back();
  }

}
