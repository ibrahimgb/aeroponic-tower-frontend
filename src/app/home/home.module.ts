import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialModule } from '../material.module';
import { AllUsersComponent } from './all-users/all-users.component';
import { SnackBarComponent } from './all-users/snack-bar/snack-bar.component';
//import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { EditDialogComponent } from './monitoring/tower-monitoring/edit-dialog/edit-dialog.component';
import { TowerMonitoringComponent } from './monitoring/tower-monitoring/tower-monitoring.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReadingDirective } from './sensers-readings/reading.directive';
import { ReadingComponent } from './sensers-readings/reading/reading.component';
import { SensersReadingsComponent } from './sensers-readings/sensers-readings.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { EditProfilePicComponent } from './user-settings/edit-profile-pic/edit-profile-pic.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
];

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
    EditProfilePicComponent,
    MonitoringComponent,
    TowerMonitoringComponent,
    EditDialogComponent,
    AllUsersComponent,
    SnackBarComponent,
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
    ImageCropperModule,
    //HomeRoutingModule,
    RouterModule.forChild(routes),
  ],
  exports: [HomeComponent],
  providers: [HomeService],
})
export class HomeModule {}
