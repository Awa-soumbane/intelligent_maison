import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { TableActifsComponent } from './table-actif/table-actif.component';
<<<<<<< HEAD
=======
import { LocalisationComponent } from './localisation/localisation.component';
import { TableArchivesComponent} from './table-archive/table-archive.component';

>>>>>>> origin/oumy
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [
  {component: InscriptionComponent, path:'inscription'},
  {component: TableActifsComponent, path:'tableActif'},
<<<<<<< HEAD
  {component:SidebarComponent, path:'home'},
=======
  {component:  TableArchivesComponent, path:'tableArchive'},
  { path:"localisation", component: LocalisationComponent},
>>>>>>> origin/oumy
  {path:"login", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
