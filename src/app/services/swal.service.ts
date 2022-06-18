import { Injectable } from '@angular/core';
import * as Swal from '../../../src/assets/js/swal.min.js'
@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  showSuccessAlert(title: string, options: Partial<SwalOptions>) {
    if (!options.position) {
      options.position = SwalPositionType.TopEnd
    }
    const Toast = Swal.mixin({
      toast: true,
      position: options.position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: options.iconType,
      title: title
    })
  }
}
export class SwalOptions {
  position: SwalPositionType;
  iconType: SwalIconType;
  timer?: number = 3000;
}
export enum SwalPositionType {
  TopEnd = "top-end",
  TopStart = "top-start",
  BottomEnd = "bottom-end",
  BottomStart = "bottom-start"
}
export enum SwalIconType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info"
}
