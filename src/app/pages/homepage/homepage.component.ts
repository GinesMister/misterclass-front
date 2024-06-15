import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from '../../services/login-info.service';
import { Router } from '@angular/router';
import { Subject } from '../../models/subjectDTO';
import { isColorDark } from '../../functions/colorData';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  isCreateSubjectVisible = false
  isSubscribeSubjectVisible = false

  constructor (
    public loginInfo: LoginInfoService,
    public router: Router
  ) { }

  ngOnInit() {
    if (!this.loginInfo.isLogged())
      this.router.navigate(['/iniciar-sesion']);
  }

  isCardDark(subject: Subject) {
    return isColorDark(subject.color!)
  }

  switchSubscribeSubjectVisible = () => this.isSubscribeSubjectVisible = !this.isSubscribeSubjectVisible
  switchCreateSubjectVisible = () => this.isCreateSubjectVisible = !this.isCreateSubjectVisible
}
