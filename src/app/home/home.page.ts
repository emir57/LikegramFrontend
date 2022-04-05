import { Component } from '@angular/core';
import { SwalIconType, SwalPositionType, SwalService } from '../services/swal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public swalService:SwalService) {}

  showMessage(){
    this.swalService.showSuccessAlert("işlem başarılı",{iconType:SwalIconType.Warning})
  }
}
