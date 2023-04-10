import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
