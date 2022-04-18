import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { KeyType, StorageService } from 'src/app/services/storage.service';
import { SwalIconType, SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private messageService: SwalService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private alertController: AlertController
  ) { }
  isLoad = true;
  loginForm: FormGroup
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  async login() {
    if (this.loginForm.valid) {
      this.loadingService.showLoader("Giriş Yapılıyor..");
      this.isLoad = false;
      let loginModel = this.loginForm.value;
      this.authService.login(loginModel).subscribe(async response => {
        if (response.success) {
          await this.storageService.setName(KeyType.User, JSON.stringify(response.data.user));
          await this.storageService.setName(KeyType.Token, JSON.stringify(response.data.accessToken));
          console.log(response)
          this.messageService.showSuccessAlert("Giriş Başarılı", { iconType: SwalIconType.Success });
          setTimeout(async () => {
            await this.loadingService.closeLoader();
            this.isLoad = true;
          }, 1000);
          setTimeout(() => {
            this.router.navigateByUrl("/home/posts")
          }, 1500);
        } else {
          this.messageService.showSuccessAlert("Bir hata oluştu", { iconType: SwalIconType.Error });
          await this.loadingService.closeLoader();
          this.isLoad = true;
        }
      }, async responseErr => {
        this.messageService.showSuccessAlert(responseErr.error.message, { iconType: SwalIconType.Error });
        await this.loadingService.closeLoader();
        this.isLoad = true;
        if (responseErr.error.message === "Lütfen eposta adresinizi onaylayınız") {
          this.presentAlertPrompt();
        }
      })
    }
  }

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Lütfen eposta adresinize gelen doğrulama kodunu giriniz',
      inputs: [
        {
          name: 'key',
          type: 'text',
          placeholder: 'Doğrlama kodu'
        },
      ],
      buttons: [
        {
          text: 'Kapat',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Doğrlua',
          handler: (value) => {
            console.log(value.key);
          }
        }
      ]
    });
    await alert.present();
  }
}
