import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginInfoService } from '../../services/login-info.service';
import { SubjectService } from '../../services/subject.service';
import { isColorDark } from '../../functions/colorData';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  
  subjectCode: string = ''
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginInfo: LoginInfoService,
    public subjectService: SubjectService
  ) { }
  
  ngOnInit() {
    if (!this.loginInfo.isLogged())
      this.router.navigate(['/iniciar-sesion']);
    
    this.route.params.subscribe(params => {
      this.subjectCode = params['id']
      this.subjectService.updateSubjectData(
        this.loginInfo.userData?.subjectsSubscribed.find(
          subject => subject.accessCode === this.subjectCode
        )?.subjectId
      )
    })
  }

  isSubjectColorDark() {
    return isColorDark(this.subjectService.subjectData?.color!)
  }  
}
