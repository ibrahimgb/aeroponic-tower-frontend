import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule} from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatRippleModule} from '@angular/material/core';
import { SensersReadingsComponent } from './sensers-readings/sensers-readings.component';
import { MaterialModule } from "../material.module";
import { ReadingComponent } from './sensers-readings/reading/reading.component';
import { ReadingDirective } from './sensers-readings/reading.directive';
import { LineChartComponent } from './line-chart/line-chart.component'

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
    SensersReadingsComponent,
    ReadingComponent,
    ReadingDirective,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatRippleModule,
    MaterialModule
  ],
  exports: [
    HomeComponent
  ]

})
export class HomeModule { }
