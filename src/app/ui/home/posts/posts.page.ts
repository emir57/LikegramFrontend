import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  isClickHeart:boolean=false;
  isClickBookmark:boolean=false;
  constructor() { }

  ngOnInit() {
  }

  postLike() {
    if(this.isClickHeart) this.isClickHeart = false
    else this.isClickHeart = true;
  }

  postComment() {

  }

  postSend() {

  }

  postSave() {
    if(this.isClickBookmark) this.isClickBookmark = false
    else this.isClickBookmark = true;
  }

}
