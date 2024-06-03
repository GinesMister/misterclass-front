import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from '../../services/login-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor (
    public loginInfo: LoginInfoService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.loginInfo.isLogged()) 
      this.router.navigate(['/iniciar-sesion']);
  }

}
