import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  isLoad = true;
  loginForm: FormGroup
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login(){
    this.isLoad = false;
    setTimeout(() => {
      this.isLoad = true;
    }, 2000);
  }

}
