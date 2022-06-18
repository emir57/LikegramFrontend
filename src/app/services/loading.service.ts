import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadingController: LoadingController
  ) { }

  async showLoader(message?: string) {
    const loader = await this.loadingController.create({
      message: message ?? "yükleniyor.."
    })
    await loader.present();
  }

  async closeLoader() {
    await this.loadingController.dismiss();
  }
}
