import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableActifsComponent } from './table-actif/table-actif.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {component: InscriptionComponent, path:'inscription'},
  {component: TableActifsComponent, path:'tableActif'},
  {path:"connexion", component: ConnexionComponent},
  {path:"login", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
