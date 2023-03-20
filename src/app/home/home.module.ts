import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule} from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavComponent } from './sidenav/sidenav.component'


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    FontAwesomeModule
  ],
  exports: [
    HomeComponent
  ]

})
export class HomeModule { }
