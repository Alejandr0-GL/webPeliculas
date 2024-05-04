import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { IngresarActualizarUsuarioComponent } from './pages/ingresar-actualizar-usuario/ingresar-actualizar-usuario.component';

const routes: Routes = [

  {path:'iniciarSesion', component:IniciarSesionComponent},
  {path:'registrarse', component:RegistrarseComponent},
  {path:'administrarUsuarios', component:AdministrarUsuariosComponent},
  {path:'ingresarUsuario', component:IngresarActualizarUsuarioComponent},
  {path:'actualizarUsuario/:idUsuario', component:IngresarActualizarUsuarioComponent},
  {path:'perfil', component:PerfilComponent},
  {path:'home', component:HomeComponent},
  {path:'pelicula/:idPelicula', component:PeliculaComponent},
  {path:'buscar/:txtBuscar', component:BuscarComponent},
  {path:'', pathMatch: 'full', redirectTo: '/iniciarSesion'},
  {path:'**', redirectTo: '/iniciarSesion'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
