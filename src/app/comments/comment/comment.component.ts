import { Component, Inject, Input, OnInit } from '@angular/core';
import { PostCommentModel } from 'src/app/models/postCommentModel';
import { UserModel } from 'src/app/models/userModel';
import { AnswerService } from 'src/app/services/answer.service';
import { CommentLikeService } from 'src/app/services/comment-like.service';
import { KeyType, StorageService } from 'src/app/services/storage.service';
declare var $: any;

@Component({
  selector: 'comment-card',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() comment: PostCommentModel;
  user: UserModel;
  selectedComment: PostCommentModel = undefined;
  constructor(
    private commentLikeService: CommentLikeService,
    private storageService: StorageService,
    @Inject("baseUrl") public baseUrl: string,
    private answerService: AnswerService
  ) { }

  async ngOnInit() {
    await this.getUser();
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
  }

  commentLike(comment: PostCommentModel) {
    let fontSize = "20px";
    this.commentLikeService.likeOrUnlike(comment.id, this.user.id).subscribe(async response => {
      if (response.success) {
        if (comment.isClickHeart) {
          comment.isClickHeart = false;
          setTimeout(() => {
            $("#commentlike" + comment.id + "_1").animate({
              fontSize: fontSize,
              opacity: 0
            }, 0)
            setTimeout(() => {
              $("#commentlike" + comment.id + "_1").animate({
                fontSize: fontSize,
                opacity: 1
              })
            }, 200);
          }, 100);
        }
        else {
          comment.isClickHeart = true;
          setTimeout(() => {
            $("#commentlike" + comment.id + "_2").animate({
              fontSize: fontSize,
              opacity: 0
            }, 0)
            setTimeout(() => {
              $("#commentlike" + comment.id + "_2").animate({
                fontSize: fontSize,
                opacity: 1
              })
            }, 200);
          }, 100);
        }
      }
    })
  }

  selectComment(comment: PostCommentModel) {
    if (this.selectedComment) this.removeSelectedComment();
    $("#comment" + comment.id).addClass("bg-warning text-white");
    this.selectedComment = comment;
  }
  removeSelectedComment() {
    $("#comment" + this.selectedComment.id).removeClass("bg-warning text-white");
    this.selectedComment = undefined;
  }

  getAnswers(comment: PostCommentModel) {
    if (comment.isClickShowAnswer) {
      comment.isClickShowAnswer = false;
      comment.commentAnswers = [];
    } else {
      comment.isClickShowAnswer = true;
      this.answerService.getAnswersByCommentId(comment.id).subscribe(async response => {
        if (response.success) {
          comment.commentAnswers = response.data;
          this.sortAnswers(comment);
        }
      })
    }
  }
  sortAnswers(comment: PostCommentModel) {
    comment.commentAnswers.sort((a, b) => (new Date(b.createdDate)).getTime() - (new Date(a.createdDate)).getTime())
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }


}
