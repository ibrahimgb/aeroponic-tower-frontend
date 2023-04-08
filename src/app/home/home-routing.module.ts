import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { SensersReadingsComponent } from './sensers-readings/sensers-readings.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'users',
    component: AllUsersComponent,
  },
  { path: 'readings', component: SensersReadingsComponent },
  { path: 'settings', component: UserSettingsComponent },
  { path: 'monitoring', component: MonitoringComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
