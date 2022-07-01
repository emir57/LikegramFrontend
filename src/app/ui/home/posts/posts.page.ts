import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from 'src/app/comments/comments.page';
import { PostModel } from 'src/app/models/postModel';
import { Usermodel } from 'src/app/services/auth.service';
import { FavouritePostService } from 'src/app/services/favourite-post.service';
import { PostLikeService } from 'src/app/services/post-like.service';
import { PostService } from 'src/app/services/post.service';
import { KeyType, StorageService } from 'src/app/services/storage.service';

declare var $: any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  selectedPost: PostModel = undefined;
  posts: PostModel[] = [];
  isClickHeart: boolean = false;
  isClickBookmark: boolean = false;
  user: Usermodel
  items: any[] = [{}, {}, {}, {}]
  constructor(
    private storageService: StorageService,
    private postService: PostService,
    @Inject("baseUrl") public baseUrl: string,
    private modalController: ModalController,
    private postLikeService: PostLikeService,
    private favouritePostService: FavouritePostService
  ) { }

  async ngOnInit() {
    await this.getUser();
    this.getPosts();
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User))
  }
  getPosts() {
    this.postService.getPosts(this.user.id).subscribe(response => {
      if (response.success) {
        this.posts = response.data
      }
    })
  }

  share() {
    let button = $(".roundButton:first");
    this.scaleAnimation(button);
  }

  link() {
    let button = $(".roundButton:nth-child(2)");
    this.scaleAnimation(button);
  }

  complaint() {
    let button = $(".roundButton:nth-child(3)");
    this.scaleAnimation(button);
  }

  scaleAnimation(button: any) {
    button.click(function () {
      button.css("transform", "scale(0.7)");
      setTimeout(() => {
        button.css("transform", "scale(1)");
      }, 300);
    })
  }


}
