import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AllUsersComponent } from './home/all-users/all-users.component';
import { HomeComponent } from './home/home.component';
import { MonitoringComponent } from './home/monitoring/monitoring.component';
import { SensersReadingsComponent } from './home/sensers-readings/sensers-readings.component';
import { UserSettingsComponent } from './home/user-settings/user-settings.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'readings', pathMatch: 'full' },
      {
        path: 'users',
        component: AllUsersComponent,
      },
      { path: 'readings', component: SensersReadingsComponent },
      { path: 'settings', component: UserSettingsComponent },
      { path: 'monitoring', component: MonitoringComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
