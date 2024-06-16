import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginInfoService } from '../../services/login-info.service';
import { SubjectService } from '../../services/subject.service';
import { Unit } from '../../models/subjectDTO';
import { isColorDark } from '../../functions/colorData';
import { SubjectApiService } from '../../services/server-petitions/api/subject-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.scss']
})
export class UnitDetailsComponent implements OnInit {

  unit: Unit = new Unit()

  activedTab: 'theory' | 'task' = 'theory'

  isCreateActionsVisible = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginInfo: LoginInfoService,
    public subjectService: SubjectService,
    public subjectApi: SubjectApiService
  ) { }

  ngOnInit() {
    if (!this.loginInfo.isLogged())
      this.router.navigate(['/iniciar-sesion']);
    
    this.route.params.subscribe(params => {
      this.unit.unitId = params['unitId']
      this.loginInfo.checkRoleInSubject(params['id'], 'code')
      this.updateUnitFromSubjectData()
    })
  }

  updateUnitFromSubjectData($previusAction?: Observable<any>) {
    if (!$previusAction) {
      this.unit = this.subjectService.subjectData?.units?.find(
        unit => unit.unitId == this.unit.unitId
      )!
      return
    }

    $previusAction.subscribe(() => {
      this.subjectService.updateSubjectData(undefined, () => {
        this.unit = this.subjectService.subjectData?.units?.find(
          unit => unit.unitId == this.unit.unitId
        )!
      })
    })
  }

  isSubjectColorDark() {
    return isColorDark(this.subjectService.subjectData?.color!)
  }

  switchCreateActionsVisible = () => this.isCreateActionsVisible = !this.isCreateActionsVisible
}
