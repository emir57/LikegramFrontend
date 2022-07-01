import { Component, Inject, Input, OnInit } from '@angular/core';
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
  selector: 'post-card',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  user: Usermodel;
  @Input() post: PostModel;
  selectedPost: PostModel = undefined;
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
    this.postSettingArrowAnimation();
    this.postSettingSlideDown();
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User))
  }

  postSettingSlideDown() {
    let slideBtn = document.getElementById("slideBtn");
    let postSettingsDiv = document.getElementById("postSettingsDiv");
    let postSettingsDivBackground = document.getElementById("postSettingsDivBackground");
    slideBtn.addEventListener("swiped-down", (event) => {
      this.closePostSetting();
    }, false);
    postSettingsDiv.addEventListener("swiped-down", (event) => {
      this.closePostSetting();
    }, false)
    postSettingsDivBackground.addEventListener("swiped-down", (event) => {
      this.closePostSetting();
    }, false)
  }

  postSettingArrowAnimation() {
    let arrow1 = $("#downArrow1");
    let arrow2 = $("#downArrow2");
    setInterval(() => {
      setTimeout(() => {
        arrow1.fadeIn();
        arrow2.fadeOut();
      }, 0);
      setTimeout(() => {
        arrow2.fadeIn();
      }, 200);
      setTimeout(() => {
        arrow1.fadeOut();
        arrow2.fadeOut();
      }, 400);
    }, 500)
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
    this.favouritePostService.deleteOrAdd(this.user.id, post.id).subscribe(async response => {
      if (response.success) {
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
    })
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
    this.selectedPost = post;
    let settingDiv = $("#postSettingsDiv");
    let bacground = $("#postSettingsDivBackground");

    settingDiv.fadeIn();
    settingDiv.css("bottom", "0");
    bacground.fadeIn();
    bacground.css("bottom", "0");
  }

  closePostSetting() {
    this.selectedPost = undefined;
    let height = 45;
    let settingDiv = $("#postSettingsDiv");
    let bacground = $("#postSettingsDivBackground");

    settingDiv.fadeOut();
    settingDiv.css("bottom", `-${height}%`);
    bacground.fadeOut();
    bacground.css("bottom", "-100%");
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
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
