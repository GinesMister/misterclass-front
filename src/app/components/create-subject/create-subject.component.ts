import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoService } from '../../services/login-info.service';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { Subject } from '../../models/subjectDTO';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnInit {

  @Output() onAciton: EventEmitter<void> = new EventEmitter<void>()

  subjectForm: FormGroup
  newSubjectCode: string | undefined
  isCreated = false

  constructor(
    private fb: FormBuilder,
    private loginInfo: LoginInfoService,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.subjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      color: ['', [Validators.required]]
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
      this.loginInfo.updateUserData()
      this.isCreated = true
    })
  }

  cancel() {
    this.onAciton.emit()
  }
}
