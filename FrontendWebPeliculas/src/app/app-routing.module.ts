import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { AdministrarUsuariosComponent } from './pages/administrar-usuarios/administrar-usuarios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';

const routes: Routes = [

  {path:'iniciarSesion', component:IniciarSesionComponent},
  {path:'registrarse', component:RegistrarseComponent},
  {path:'administrarUsuarios', component:AdministrarUsuariosComponent},
  {path:'perfil', component:PerfilComponent},
  {path:'home', component:HomeComponent},
  {path:'pelicula/:movieID', component:PeliculaComponent},
  {path:'buscar/:txtBuscar', component:BuscarComponent},
  {path:'', pathMatch: 'full', redirectTo: '/home'},
  {path:'**', redirectTo: '/home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
