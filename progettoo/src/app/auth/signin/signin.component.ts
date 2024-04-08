import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private authSrv: AuthService, private router: Router, private userSrv: UserService) {}

    onSubmit(form: NgForm) {
        console.log(form.value);
        try {
            this.authSrv.signup(form.value).subscribe();
            this.router.navigate(['/login']);
        } catch (error) {
            console.error(error);
        }
    }
}
