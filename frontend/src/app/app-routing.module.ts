import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableActifsComponent } from './table-actif/table-actif.component';
import { LoginComponent } from './login/login.component';
import { TableArchivesComponent } from './table-archive/table-archive.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { DashbordComponent } from './dashbord-enfant/dashbord.component';
import { DashboardLocataireComponent } from './dashboard-locataire/dashboard-locataire.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProfilComponent } from './profil/profil.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashbordParent } from './parent/dashbord-parent.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {component: InscriptionComponent, path:'inscription',canActivate: [AuthGuard] },
  {component: TableActifsComponent, path:'tableActif' ,canActivate: [AuthGuard]},
  {component: DashbordComponent, path:'home' ,canActivate: [AuthGuard]},
 {component: ProfilComponent, path: 'profile' ,canActivate: [AuthGuard]},
  {component: DashbordComponent, path:'enfant' ,canActivate: [AuthGuard]},
  {component: LoginComponent, path:'login'},
  {component:  TableArchivesComponent, path:'tableArchive' ,canActivate: [AuthGuard]},
  { path:"localisation", component: LocalisationComponent ,canActivate: [AuthGuard]},
  {component:AcceuilComponent, path:'index' ,canActivate: [AuthGuard]},
 {component: DashbordParent, path: 'parent' ,canActivate: [AuthGuard]},
{component:SidebarComponent, path: 'sidebar' ,canActivate: [AuthGuard]},
{component:LocalisationComponent, path: 'localisation' ,canActivate: [AuthGuard]},
{component:DashboardLocataireComponent, path: 'locataire' ,canActivate: [AuthGuard]},
{ path: '*', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
