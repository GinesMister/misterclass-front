import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from '../../../models/authRequestDTO';
import { AuthService } from '../../../services/server-petitions/api/auth.service';
import { LoginInfoService } from '../../../services/login-info.service';
import { Router } from '@angular/router';
import shajs from 'sha.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loginErrorMessage: boolean = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loginInfoService: LoginInfoService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.loginInfoService.isLogged())
      this.router.navigate(['/']);
  }

  onSubmit(): void {
    const authRequest = new AuthRequest(
      <string>this.loginForm.value.username,
      shajs('sha256').update(<string>this.loginForm.value.password).digest('hex'),
      true
    )
    
    this.authService.logInRegister(authRequest).subscribe(res => {
      if (res) {
        this.loginInfoService.addLoggedUser(authRequest)
        return
      }
      this.loginErrorMessage = true
      this.loginForm.reset()
    })
  }

}
