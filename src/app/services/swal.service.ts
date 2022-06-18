import { Injectable } from '@angular/core';
import * as Swal from '../../../src/assets/js/swal.min.js'
@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  showSuccessAlert(title: string, options?: Partial<SwalOptions>) {
    if (!options.position) {
      options.position = SwalPositionType.TopEnd
    }
    const Toast = this.setToast(options);
    Toast.fire({
      icon: options.iconType ?? SwalIconType.Success,
      title: title
    })
  }

  showErrorAlert(title: string, options?: Partial<SwalOptions>) {
    if (!options.position) {
      options.position = SwalPositionType.TopEnd
    }
    const Toast = this.setToast(options);
    Toast.fire({
      icon: options.iconType ?? SwalIconType.Error,
      title: title
    })
  }

  showWarningAlert(title: string, options?: Partial<SwalOptions>) {
    if (!options.position) {
      options.position = SwalPositionType.TopEnd
    }
    const Toast = this.setToast(options);
    Toast.fire({
      icon: options.iconType ?? SwalIconType.Warning,
      title: title
    })
  }

  showInfoAlert(title: string, options?: Partial<SwalOptions>) {
    if (!options.position) {
      options.position = SwalPositionType.TopEnd
    }
    const Toast = this.setToast(options);
    Toast.fire({
      icon: options.iconType ?? SwalIconType.Info,
      title: title
    })
  }

  private setToast(options?: Partial<SwalOptions>) {
    return Swal.mixin({
      toast: true,
      position: options.position,
      showConfirmButton: false,
      timer: options.timer ?? 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
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
