import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  isClickHeart: boolean = false;
  isClickBookmark: boolean = false;
  items: any[] = [{}, {}, {}, {}]
  constructor() { }

  ngOnInit() {
  }

  postLike(id: string) {
    if (this.isClickHeart) {
      this.isClickHeart = false;
      setTimeout(() => {
        $("#postlike" + id + "_1").animate({
          fontSize: "30px",
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postlike" + id + "_1").animate({
            fontSize: "30px",
            opacity: 1
          })
        }, 200);
      }, 100);
    }
    else {
      this.isClickHeart = true;
      setTimeout(() => {
        $("#postlike" + id + "_2").animate({
          fontSize: "30px",
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postlike" + id + "_2").animate({
            fontSize: "30px",
            opacity: 1
          })
        }, 200);
      }, 100);
    }
  }

  postComment() {

  }

  postSend() {

  }

  postSave(id: string) {
    if (this.isClickBookmark) {
      this.isClickBookmark = false;
      setTimeout(() => {
        $("#postsave" + id + "_1").animate({
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postsave" + id + "_1").animate({
            opacity: 1
          })
        }, 200);
      }, 100);
    }
    else {
      this.isClickBookmark = true;
      setTimeout(() => {
        $("#postsave" + id + "_2").animate({
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postsave" + id + "_2").animate({
            opacity: 1
          })
        }, 200);
      }, 100);
    }
  }

}
