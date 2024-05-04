import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  isLoggedIn = false
  private apiURL = 'https://localhost:7290/api/User/';
  esAdminVariable?:boolean;
  

  constructor(private http:HttpClient) { }

  getIdUsuarioToken(){
  
    const tokenGenerado = sessionStorage.getItem('tokenGenerado');

    if (!tokenGenerado) {
      console.error('El token no está en sessionStorage');
      return null;
    }

    const tokenDecodificado = JSON.parse(atob(tokenGenerado.split('.')[1])); // Token decodificado
    const idUsuario = tokenDecodificado.idUsuarioToken;

    return idUsuario;
  }

  getRol(idUsuario:string):Observable<any>{
    return this.http.get<any>(`${this.apiURL}Rol?idUsuario=${idUsuario}`)
  }

  esAdmin(): void {
    //Obtiene el id desde el token en sessionStorage
    const idUsuario = this.getIdUsuarioToken();
  
    if (!idUsuario) {
      console.error('El token no está en sessionStorage');
      this.esAdminVariable = false; // 
      return;
    }
  
    //Obtiene el rol del usuario
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

  getAutenticacion(nombreUsuarioOEmail:string, password:string):Observable<any>{
    return this.http.get<any>(`${this.apiURL}Autenticacion?nombreUsuarioOEmail=${nombreUsuarioOEmail}&password=${password}`)
  }

  onAutenticacionExitosa() {
    this.isLoggedIn = true; 
  }

  //CRUD ------------------------------------------

  getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.apiURL}UsuariosALista`).pipe(
      map((Response)=> Response)
    );
  }

  getUsuarioPorID(idUsuario:number){
    return this.http.get<Usuario>(`${this.apiURL}${idUsuario}`)
  }

  registrarUsuario(usuario: {nombreUsuario:string, email:string, password:string, rol:string}):Observable<any>{
    return this.http.post(`${this.apiURL}IngresarUsuario`, usuario);
  }

  actualizarUsuario(usuario: {idUsuario:number, nombreUsuario:string, email:string, password:string, rol:string}){
    return this.http.put(`${this.apiURL}ActualizarUsuario`, usuario)
  }
  
  eliminarUsuario(idUsuario:string){
    return this.http.delete(`${this.apiURL}EliminarUsuario?idUsuario=${idUsuario}`)
  }

}
