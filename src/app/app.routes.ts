import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { CreateCursosComponent } from './Pages/create-cursos/create-cursos.component';

export const routes: Routes = [
  { path: '', component:InicioComponent },
  {path: 'inicio', component:InicioComponent},
  {path: 'curso/:idCurso', component:CreateCursosComponent}
];
