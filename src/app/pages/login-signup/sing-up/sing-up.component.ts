import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInfoService } from '../../../services/login-info.service';
import { AuthService } from '../../../services/server-petitions/api/auth.service';
import shajs from 'sha.js';
import { AuthRequest } from '../../../models/authRequestDTO';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
  registerForm: FormGroup;
  registerError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loginInfoService: LoginInfoService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userId: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  }

  ngOnInit() {
    if (this.loginInfoService.isLogged())
      this.router.navigate(['/']);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    const authRequest = new AuthRequest(
      <string>this.registerForm.value.userId,
      shajs('sha256').update(<string>this.registerForm.value.password).digest('hex'),
      false
    )
    authRequest.name = <string>this.registerForm.value.name
    authRequest.surname = <string>this.registerForm.value.surname
    authRequest.email = <string>this.registerForm.value.email

    this.authService.logInRegister(authRequest).subscribe(res => {
      if (res) {
        this.loginInfoService.addLoggedUser(authRequest)
        return
      }
      this.registerError = true
    })
  }

}
