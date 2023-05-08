
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashbordComponent } from './dashbord-enfant/dashbord.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavebarComponent } from './navebar/navebar.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableActifsComponent } from './table-actif/table-actif.component';
import { TableArchivesComponent } from './table-archive/table-archive.component';
import { LoginComponent} from './login/login.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AcceuilComponent } from './acceuil/acceuil.component';

import { ProfilComponent } from './profil/profil.component';
import { DashbordParent } from './parent/dashbord-parent.component';


@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    SidebarComponent,
    NavebarComponent,
    InscriptionComponent,
    TableActifsComponent,
    TableArchivesComponent,
    LoginComponent,
    LocalisationComponent,
    AcceuilComponent,
    DashbordComponent, 
    DashbordParent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
