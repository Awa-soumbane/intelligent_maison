import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableActifsComponent } from './table-actif/table-actif.component';
import { LoginComponent } from './login/login.component';
import { TableArchivesComponent } from './table-archive/table-archive.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { DashbordComponent } from './dashbord-enfant/dashbord.component';
import { DashbordParentComponent } from './dashbord-parent/dashbord-parent.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

const routes: Routes = [
  {component: InscriptionComponent, path:'inscription'},
  {component: TableActifsComponent, path:'tableActif'},
  {component: DashbordComponent, path:'home'},
  {component: DashbordParentComponent, path:'parent'},
  {component: DashbordComponent, path:'enfant'},
  {component:  TableArchivesComponent, path:'tableArchive'},
  { path:"localisation", component: LocalisationComponent},
  {component:AcceuilComponent, path:'index'},
  {path:"login", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
