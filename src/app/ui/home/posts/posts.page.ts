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

  ngOnInit() {
    this.getUser();
    setTimeout(() => {
      this.getPosts();
    }, 500);
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User))
  }
  getPosts() {
    this.postService.getPosts(this.user.id).subscribe(response => {
      if (response.success) {
        this.posts = response.data
        this.posts.forEach(p => {
          this.postLikeService.checkLike(this.user.id, p.id).subscribe(isLikeResponse => {
            p.isClickHeart = isLikeResponse.success;
          })
        })
      }
    })
  }

  postLike(post: PostModel) {
    let fontSize = "30px";
    this.postLikeService.likeOrUnlike(this.user.id, post.id).subscribe(response => {
      if (response.success) {
        if (post.isClickHeart) {
          post.postLikes.push();
          post.isClickHeart = false;
          setTimeout(() => {
            $("#postlike" + post.id + "_1").animate({
              fontSize: fontSize,
              opacity: 0
            }, 0)
            setTimeout(() => {
              $("#postlike" + post.id + "_1").animate({
                fontSize: fontSize,
                opacity: 1
              })
            }, 200);
          }, 100);
        }
        else {
          post.isClickHeart = true;
          post.postLikes.pop();
          setTimeout(() => {
            $("#postlike" + post.id + "_2").animate({
              fontSize: fontSize,
              opacity: 0
            }, 0)
            setTimeout(() => {
              $("#postlike" + post.id + "_2").animate({
                fontSize: fontSize,
                opacity: 1
              })
            }, 200);
          }, 100);
        }
      }
    })
  }

  async postComment(post: PostModel) {
    post.isClickComment = true;
    await this.openCommentModal(post)
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
      swipeToClose: true,
      cssClass: "custom-modal",
      componentProps: {
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

  openPostSetting(post: PostModel) {
    let settingModal = $("#postsetting" + post.id);
    settingModal.fadeToggle();
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }
}
