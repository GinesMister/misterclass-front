import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoService } from '../../services/login-info.service';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { SubjectApiService } from '../../services/server-petitions/api/subject-api.service';

@Component({
  selector: 'app-subscribe-subject',
  templateUrl: './subscribe-subject.component.html',
  styleUrls: ['./subscribe-subject.component.scss']
})
export class SubscribeSubjectComponent implements OnInit {

  @Output() onAciton: EventEmitter<void> = new EventEmitter<void>()

  subscribeForm: FormGroup
  subscribeError = false

  constructor(
    private fb: FormBuilder,
    private loginInfo: LoginInfoService,
    private subjectService: SubjectService,
    private router: Router
  ) {
    this.subscribeForm = this.fb.group({
      accessCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    })
  }

  ngOnInit() {
    if (!this.loginInfo.isLogged()) 
      this.router.navigate(['/iniciar-sesion']);
  }

  onSubmit() {
    if (!this.subscribeForm.valid) return
    this.subjectService.subscribeStudentToSubject(this.subscribeForm.value.accessCode).subscribe(res => {
      if (res) {
        this.loginInfo.updateUserData()
        this.onAciton.emit()
      }
      else this.subscribeError = true
    })
  }

  cancel() {
    this.onAciton.emit()
  }
}
