import { Component, Inject, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/userModel';
import { KeyType, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: UserModel
  constructor(
    @Inject("baseUrl") public baseUrl: string,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getUser();
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
  }

  openMenu() {

  }

}
