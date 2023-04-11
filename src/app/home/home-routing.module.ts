import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { SensersReadingsComponent } from './sensers-readings/sensers-readings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'home/users',
    component: AllUsersComponent,
  },
  { path: 'home/readings', component: SensersReadingsComponent },
  { path: 'home/settings', component: UserSettingsComponent },
  { path: 'home/monitoring', component: MonitoringComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
