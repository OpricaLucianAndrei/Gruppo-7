import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ColoService } from './service/colo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  
  constructor(private authSrv: AuthService, private coloSrv: ColoService) {}

  ngOnInit(): void {
      this.authSrv.restore();

  }


  title = 'progettoo';
}
