import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginInfoService } from '../../services/login-info.service';
import { SubjectService } from '../../services/subject.service';
import { Unit } from '../../models/subjectDTO';
import { isColorDark } from '../../functions/colorData';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.scss']
})
export class UnitDetailsComponent implements OnInit {

  unit: Unit = new Unit() 

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
      console.log(this.unit)
      this.unit.unitId = params['unitId']
      this.updateUnitFromSubjectData()
    })
  }

  updateUnitFromSubjectData() {
    this.unit = this.subjectService.subjectData?.units?.find(
      unit => unit.unitId == this.unit.unitId
    )!
  }

  isSubjectColorDark() {
    return isColorDark(this.subjectService.subjectData?.color!)
  }
}
