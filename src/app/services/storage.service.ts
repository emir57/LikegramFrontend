import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async setValue(key: KeyType, value: any) {
    await Storage.set({
      key: key,
      value: value
    })
  }

  async getValue(key: KeyType) {
    const { value } = await Storage.get({
      key: key
    })
    return value;
  }

  async removeValue(key: KeyType) {
    await Storage.remove({
      key: key
    })
  }

}
export enum KeyType {
  Token = "likegram.token",
  User = "likegram.user"
}
