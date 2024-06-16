import { Component, Input, OnInit } from '@angular/core';
import { TheoryElement } from '../../models/subjectDTO';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { DataConnetion } from '../../services/server-petitions/dataConnection';
import { LoginInfoService } from '../../services/login-info.service';

@Component({
  selector: 'app-theory-details',
  templateUrl: './theory-details.component.html',
  styleUrls: ['./theory-details.component.scss']
})
export class TheoryDetailsComponent implements OnInit {

  @Input() theoryElement!: TheoryElement
  unitId!: number
  downloadLink!: string

  constructor(
    private route: ActivatedRoute,
    public subjectService: SubjectService,
    private loginInfo: LoginInfoService
  ) { }

  ngOnInit() {
    if (this.theoryElement) return
    this.route.params.subscribe(params => {
      this.theoryElement = new TheoryElement(params['theoryId'])
      this.unitId = params['unitId']
      this.updateTheoryElementFromSubjectData()
      this.loginInfo.checkRoleInSubject(params['id'], 'code')
    })
  }

  updateTheoryElementFromSubjectData() {
    const unitToSearch = this.subjectService.subjectData?.units?.find(
      unit => unit.unitId == this.unitId
    )!
    this.theoryElement = unitToSearch.theoryElements!.find(
      theoryElement => theoryElement.theoryElementId == this.theoryElement.theoryElementId
    )!
    this.downloadLink = 
      `${DataConnetion.downloadTheoryUrl}/${this.theoryElement.theoryElementId}/${this.theoryElement.filename}`
  }
}
