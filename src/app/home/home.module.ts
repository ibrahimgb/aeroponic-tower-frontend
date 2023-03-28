import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReadingDirective } from './sensers-readings/reading.directive';
import { ReadingComponent } from './sensers-readings/reading/reading.component';
import { SensersReadingsComponent } from './sensers-readings/sensers-readings.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
    SensersReadingsComponent,
    ReadingComponent,
    ReadingDirective,
    LineChartComponent,
    UserSettingsComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatRippleModule,
    MaterialModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [HomeComponent],
  providers: [HomeService],
})
export class HomeModule {}
