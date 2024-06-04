import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from '../../services/login-info.service';
import { Router } from '@angular/router';
import { Subject } from '../../models/subjectDTO';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor (
    public loginInfo: LoginInfoService,
    public router: Router
  ) { }

  ngOnInit() {
    if (!this.loginInfo.isLogged()) 
      this.router.navigate(['/iniciar-sesion']);
    console.log(this.loginInfo.userData?.subjectsCreated[1].color)
  }

  isCardDark(subject: Subject) {
    const r = parseInt(subject.color!.slice(1, 3), 16);
    const g = parseInt(subject.color!.slice(3, 5), 16);
    const b = parseInt(subject.color!.slice(5, 7), 16);

    return ((0.299 * r + 0.587 * g + 0.114 * b) / 255 * 100) < 40
  }
}
