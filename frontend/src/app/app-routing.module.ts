import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableActifsComponent } from './table-actif/table-actif.component';
import { LocalisationComponent } from './localisation/localisation.component';

import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {component: InscriptionComponent, path:'inscription'},
  {component: TableActifsComponent, path:'tableActif'},
  { path:"localisation", component: LocalisationComponent},
  {path:"login", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
