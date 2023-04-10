import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
