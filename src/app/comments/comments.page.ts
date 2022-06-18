import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentAnswerModel } from '../models/commentAnswerModel';
import { PostCommentModel } from '../models/postCommentModel';
import { UserModel } from '../models/userModel';
import { AnswerService } from '../services/answer.service';
import { Usermodel } from '../services/auth.service';
import { CommentLikeService } from '../services/comment-like.service';
import { CommentService } from '../services/comment.service';
import { LoadingService } from '../services/loading.service';
import { KeyType, StorageService } from '../services/storage.service';
import { SwalIconType, SwalService } from '../services/swal.service';
declare var $: any

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  selectedComment: PostCommentModel = undefined;
  user: UserModel;
  postComments: PostCommentModel[];
  @Input() postId: number;
  constructor(
    private modalController: ModalController,
    @Inject("baseUrl") public baseUrl: string,
    private storageService: StorageService,
    private commentService: CommentService,
    private messageService: SwalService,
    private answerService: AnswerService,
    private loadingService: LoadingService,
    private commentLikeService: CommentLikeService
  ) { }


  async ngOnInit() {
    await this.getUser();
    await this.getComments();
  }
  async getComments() {
    await this.loadingService.showLoader("yükleniyor");
    this.commentService.getCommentsByPost(this.postId).subscribe(async response => {
      this.postComments = response.data;
      this.postComments.forEach(c => {
        this.commentLikeService.checkLike(c.id, this.user.id).subscribe(isLikeResponse => {
          c.isClickHeart = isLikeResponse.success;
        })
        this.answerService.commentAnswersCount(c.id).subscribe(response => {
          c.commentAnswersCount = response.data;
        })
      })
      this.sortComments();
      await this.loadingService.closeLoader();
    }, async responseErr => {
      await this.loadingService.closeLoader();
    })
  }

  sortComments() {
    this.postComments.sort((a, b) => (new Date(b.createdDate)).getTime() - (new Date(a.createdDate)).getTime())
  }

  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
  }
  dismiss() {
    this.modalController.dismiss();
  }

  sendCommentOrAnswer() {
    let today = new Date();
    if (this.selectedComment) {
      this.doAnswer(today);
    } else {
      this.doComment(today);
    }
  }

  doComment(today: Date) {
    let comment = $("#doComment").val();
    if (!comment) return;
    let commentModel: PostCommentModel = {
      postId: this.postId,
      userId: this.user.id,
      comment: comment,
      user: this.user,
      createdDate: (new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes())).toString(),
      commentAnswers: [],
      id: 0
    }
    this.postComments.push(commentModel)
    this.sortComments();
    let addedComment = Object.assign({}, commentModel);
    delete addedComment.id;
    delete addedComment.commentAnswers;
    delete addedComment.user;
    delete addedComment.createdDate;
    this.commentService.add(addedComment).subscribe(response => {
      if (response.success) {
        this.messageService.showSuccessAlert("Yorum yapma Başarılı", { iconType: SwalIconType.Success })
      }
    }, responseErr => console.log(responseErr))
  }
  doAnswer(today: Date) {
    let answer = $("#doComment").val();
    let answerModel: CommentAnswerModel = {
      answer: answer,
      createdDate: (new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes())).toString(),
      user: this.user,
      id: 1
    }
    let addedAnswer = Object.assign({}, answerModel);
    delete addedAnswer.createdDate;
    delete addedAnswer.id;
    delete addedAnswer.user;
    addedAnswer.userId = this.user.id;
    addedAnswer.postCommentId = this.selectedComment.id;
    this.answerService.add(addedAnswer).subscribe(response => {
      if (response.success) {
        this.messageService.showSuccessAlert("yanıtlama başarılı", { iconType: SwalIconType.Success })
        this.removeSelectedComment();
      }
    })
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

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

}
