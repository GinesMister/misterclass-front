import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from '../../../models/authRequestDTO';
import { AuthService } from '../../../services/server-petitions/auth.service';
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
  login

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
      this.router.navigate(['']);
  }

  onSubmit(): void {
    const authRequest = new AuthRequest(
      <string>this.loginForm.value.username,
      <string>this.loginForm.value.password,
      // TODO poner el cifrado
      // shajs('sha256').update(<string>this.loginForm.value.password).digest('hex'),
      true
    )
    
    this.authService.logInRegister(authRequest).subscribe(res => {
      if (res) {
        this.loginInfoService.addLoggedUser(authRequest)
        this.router.navigate(['']);
      } else {

      }
    })
  }

}