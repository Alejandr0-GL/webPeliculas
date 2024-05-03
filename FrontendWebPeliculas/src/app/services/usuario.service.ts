import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsuarioALista } from '../interfaces/usuarioALista.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  isLoggedIn = false
  private apiURL = 'https://localhost:7290/api/User/';
  esAdminVariable?:boolean;
  

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<UsuarioALista[]>{

    return this.http.get<UsuarioALista>(`${this.apiURL}UsuariosALista`).pipe(
      map((Response:any)=> Response.results)
    );
  }

  getIdUsuarioToken(){
  
    const tokenGenerado = sessionStorage.getItem('tokenGenerado');

    if (!tokenGenerado) {
      console.error('El token no está en sessionStorage');
      return null;
    }

    const tokenDecodificado = JSON.parse(atob(tokenGenerado.split('.')[1])); // Decodificar el payload del token JWT
    const idUsuario = tokenDecodificado.idUsuarioToken;

    return idUsuario;
  }

  getRol(idUsuario:string):Observable<any>{
    return this.http.get<any>(`${this.apiURL}Rol?idUsuario=${idUsuario}`)
  }

  esAdmin(): void {
    const idUsuario = this.getIdUsuarioToken();
  
    if (!idUsuario) {
      console.error('El token no está en sessionStorage');
      this.esAdminVariable = false; // 
      return;
    }
  
    this.getRol(idUsuario).subscribe(
      respuesta => {
  
        if (respuesta.rol === 'administrador') {
          this.esAdminVariable = true; 
        } else {
          this.esAdminVariable = false; 
        }
      },
      error => {
        console.error('Error al obtener el rol:', error);
        this.esAdminVariable = false; 
      }
    );
  }

  registrarUsuario(usuario: {nombreUsuario:string, email:string, password:string, rol:string}):Observable<any>{ //REVISAR SI ES NECESARIO EL OBSERVABLE
    console.log('estoy en registrar usuario, usuario service', usuario)
    return this.http.post(`${this.apiURL}IngresarUsuario`, usuario);
  }


  getAutenticacion(nombreUsuarioOEmail:string, password:string):Observable<any>{
    return this.http.get<any>(`${this.apiURL}Autenticacion?nombreUsuarioOEmail=${nombreUsuarioOEmail}&password=${password}`)
  }

  onAutenticacionExitosa() {
    this.isLoggedIn = true; 
  }



}
