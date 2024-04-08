import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/post';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  user!: Login | null;

constructor( private authSrv: AuthService ) {}

ngOnInit(): void {
  this.authSrv.user$.subscribe((user) => {
      this.user = user;
  });
}

logout() {
  this.authSrv.logout()
}


}
