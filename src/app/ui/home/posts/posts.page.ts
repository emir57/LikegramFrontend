import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostModel } from 'src/app/models/postModel';
import { Usermodel } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { KeyType, StorageService } from 'src/app/services/storage.service';

declare var $: any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: PostModel[] = [];
  user: Usermodel
  constructor(
    private storageService: StorageService,
    private postService: PostService,
    @Inject("baseUrl") public baseUrl: string,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    await this.getUser();
    this.getPosts();
  }

  async doRefresh(event) {
    await this.getPosts(() => {
      event.target.complete();
    })
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User))
  }

  getPosts(callBackFunction?: () => void) {
    this.postService.getPosts(this.user.id).subscribe(response => {
      if (response.success) {
        this.posts = response.data
        if (callBackFunction)
          callBackFunction();
      }
    })
  }

  share() {
    const icon = $("#shareIcon");
    this.scaleAnimation(icon);
  }

  link() {
    const icon = $("#linkIcon");
    this.scaleAnimation(icon);
  }

  complaint() {
    const icon = $("#complaintIcon");
    this.scaleAnimation(icon);
  }

  scaleAnimation(icon: any) {
    icon.css("transform", "scale(0.7)");
    setTimeout(() => {
      icon.css("transform", "scale(1)");
    }, 200);
  }
}
