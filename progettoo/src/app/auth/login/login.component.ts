import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ColoService } from 'src/app/service/colo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private colorSrv: ColoService
  ) {}

  login(form: NgForm) {
    console.log(form.value);
    try {
      this.authSrv.login(form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } catch (error) {
      console.error(error);
    }
  }

  setColor(color: string): void {
    this.colorSrv.setColor(color);
    console.log(color)
  }

  confirmColor(): void {
    alert('Your color was changed successfully!')
  }
}
