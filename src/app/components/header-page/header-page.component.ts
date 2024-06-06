import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from '../../services/login-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss']
})
export class HeaderPageComponent implements OnInit {
  
  constructor(
    public loginInfo: LoginInfoService,
    private router: Router
  ) { }
  
  ngOnInit() {
    
  }
  
  changeRole = (role: 'student' | 'teacher') => this.loginInfo.role = role

  logout() {
    this.loginInfo.logoff()
  }
}
