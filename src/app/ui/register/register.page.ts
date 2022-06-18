import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SwalIconType, SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  isLoad = true;
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private messageService: SwalService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, Validators.minLength(5)]]
    }, { validators: this.checkPasswords })
  }

  async register() {
    if (this.registerForm.valid) {
      let registerModel = this.registerForm.value;
      delete registerModel.rePassword;
      this.isLoad = false;
      await this.loadingService.showLoader("Kayıt işlemi yapılıyor");
      this.authService.register(registerModel).subscribe(async response => {
        if (response.success) {
          this.messageService.showSuccessAlert(response.message);
          this.isLoad = true;
          await this.loadingService.closeLoader();
          setTimeout(() => {
            this.router.navigateByUrl("/login");
          }, 500);
        } else {
          this.isLoad = true;
          this.loadingService.closeLoader();
          this.messageService.showSuccessAlert(response.message)
        }
      }, responseErr => {
        this.isLoad = true;
        this.loadingService.closeLoader();
        this.messageService.showSuccessAlert(responseErr.error.message)
      })
    }
  }

  get username() {
    return this.registerForm.get("username");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get rePassword() {
    return this.registerForm.get("rePassword");
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get("password").value;
    let rePassword = group.get("rePassword").value;
    return password === rePassword ? null : { notSame: true }
  }
}
