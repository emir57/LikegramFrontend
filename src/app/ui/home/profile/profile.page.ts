import { Component, Inject, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/userModel';
import { FollowUserService } from 'src/app/services/follow-user.service';
import { PostService } from 'src/app/services/post.service';
import { KeyType, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: UserModel;
  postCount: number = 0;
  followedUserCount = 0;
  followingUserCount = 0;
  constructor(
    @Inject("baseUrl") public baseUrl: string,
    private storageService: StorageService,
    private postService: PostService,
    private followUserService: FollowUserService
  ) { }

  async ngOnInit() {
    await this.getUser();
    this.getPostCount();
    this.getFollowedUserCount();
    this.getFollowingUserCount();
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
  }

  getPostCount() {
    this.postService.getPostCount(this.user.id).subscribe(async response => {
      if (response.success)
        this.postCount = response.data;
    })
  }

  getFollowedUserCount() {
    this.followUserService.followedUserCount(this.user.id).subscribe(async response => {
      if (response.success)
        this.followedUserCount = response.data.length;
    })
  }

  getFollowingUserCount() {
    this.followUserService.followingUserCount(this.user.id).subscribe(async response => {
      if (response.success)
        this.followingUserCount = response.data.length;
    })
  }

  openMenu() {

  }

}
