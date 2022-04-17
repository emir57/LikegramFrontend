import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentsPage } from 'src/app/comments/comments.page';
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
  isClickHeart: boolean = false;
  isClickBookmark: boolean = false;
  user: Usermodel
  items: any[] = [{}, {}, {}, {}]
  constructor(
    private storageService: StorageService,
    private postService: PostService,
    @Inject("baseUrl") public baseUrl: string,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getUser();
    setTimeout(() => {
      this.getPosts();
    }, 500);
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.checkName(KeyType.User))
  }
  getPosts() {
    this.postService.getPosts(2).subscribe(response => {
      if (response.success) {
        this.posts = response.data
      }
    })
  }

  postLike(post: PostModel) {
    if (post.isClickHeart) {
      post.isClickHeart = false;
      setTimeout(() => {
        $("#postlike" + post.id + "_1").animate({
          fontSize: "30px",
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postlike" + post.id + "_1").animate({
            fontSize: "30px",
            opacity: 1
          })
        }, 200);
      }, 100);
    }
    else {
      post.isClickHeart = true;
      setTimeout(() => {
        $("#postlike" + post.id + "_2").animate({
          fontSize: "30px",
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postlike" + post.id + "_2").animate({
            fontSize: "30px",
            opacity: 1
          })
        }, 200);
      }, 100);
    }
  }

  postComment(post: PostModel) {
    post.isClickComment = true;
    this.openCommentModal(post)
  }

  postSend() {

  }

  postSave(post: PostModel) {
    if (post.isClickBookmark) {
      post.isClickBookmark = false;
      setTimeout(() => {
        $("#postsave" + post.id + "_1").animate({
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postsave" + post.id + "_1").animate({
            opacity: 1
          })
        }, 200);
      }, 100);
    }
    else {
      post.isClickBookmark = true;
      setTimeout(() => {
        $("#postsave" + post.id + "_2").animate({
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postsave" + post.id + "_2").animate({
            opacity: 1
          })
        }, 200);
      }, 100);
    }
  }

  async openCommentModal(post: PostModel) {
    const modal = await this.modalController.create({
      component: CommentsPage,
      componentProps: {
        postComments: post.postComments,
        postId: post.id
      }
    })
    modal.onDidDismiss().then(() => {
      setTimeout(() => {
        post.isClickComment = false
      }, 500);
    })
    return await modal.present();
  }
}
