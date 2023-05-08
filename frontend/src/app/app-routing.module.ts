import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableActifsComponent } from './table-actif/table-actif.component';
import { LoginComponent } from './login/login.component';
import { TableArchivesComponent } from './table-archive/table-archive.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { DashbordComponent } from './dashbord-enfant/dashbord.component';

import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfilComponent } from './profil/profil.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashbordParent } from './parent/dashbord-parent.component';


const routes: Routes = [
  {component: InscriptionComponent, path:'inscription'},
  {component: TableActifsComponent, path:'tableActif'},
  {component: DashbordComponent, path:'home'},
 
  {component: DashbordComponent, path:'enfant'},
  {component: LoginComponent, path:'login'},
  {component:  TableArchivesComponent, path:'tableArchive'},
  { path:"localisation", component: LocalisationComponent},
  {component:AcceuilComponent, path:'index'},
 {component: DashbordParent, path: 'parent'},
{component:SidebarComponent, path: 'sidebar'},
{component:LocalisationComponent, path: 'localisation'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
