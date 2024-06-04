import { Component, OnInit } from '@angular/core';
import { LoginInfoService } from '../../services/login-info.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from '../../models/subjectDTO';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {

  subjectForm: FormGroup
  createError = false
  newSubjectCode: string | undefined

  constructor(
    private fb: FormBuilder,
    public loginInfo: LoginInfoService,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.subjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      color: ['', [Validators.required, Validators.min(3)]]
    })
  }

  ngOnInit() {
    if (!this.loginInfo.isLogged()) 
      this.router.navigate(['/iniciar-sesion']);
  }

  onSubmit() {
    if (!this.subjectForm.valid) return
    const newSubject: Subject = {
      name: this.subjectForm.value.name,
      color: this.subjectForm.value.color
    }
    this.subjectService.createSubject(newSubject).subscribe(res => {
      this.newSubjectCode = res
    })
    this.loginInfo.updateUserData()
    this.createError = true
  }
}
