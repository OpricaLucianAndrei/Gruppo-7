import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ColoService } from 'src/app/service/colo.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
 user!: Login | null;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private colorSrv: ColoService
  ) {}

  login(form: NgForm, color: string) {
    console.log(form.value);
    try {
      this.authSrv.login({...form.value, color}).subscribe((data) => {
        let updatedColor = color !== '#000000' ? color : data.user.color || '#18A1D0';
        this.authSrv.updateColor(data.user.id, updatedColor).subscribe(() => {
          console.log('Color updated successfully');
          data.user.color = updatedColor;
          localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/']);
        }, (error) => {
          console.error('Error updating color:', error);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  
  

  getUser() {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  setColor(color: string): void {
    this.colorSrv.setColor(color)
  }
}
