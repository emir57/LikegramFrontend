import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentAnswerModel } from '../models/commentAnswerModel';
import { PostCommentModel } from '../models/postCommentModel';
import { UserModel } from '../models/userModel';
import { AnswerService } from '../services/answer.service';
import { Usermodel } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { KeyType, StorageService } from '../services/storage.service';
import { SwalIconType, SwalService } from '../services/swal.service';
declare var $: any

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  user: UserModel;
  @Input() postComments: PostCommentModel[];
  @Input() postId: number;
  constructor(
    private modalController: ModalController,
    @Inject("baseUrl") public baseUrl: string,
    private storageService: StorageService,
    private commentService: CommentService,
    private messageService: SwalService,
    private answerService: AnswerService
  ) { }


  ngOnInit() {
    this.sortComments();
    this.sortAnswers();
    this.getUser();
  }

  sortComments() {
    this.postComments.sort((a, b) => (new Date(b.createdDate)).getTime() - (new Date(a.createdDate)).getTime())
  }
  sortAnswers() {
    this.postComments.forEach(comment => {
      comment.commentAnswers.sort((a, b) => (new Date(a.createdDate)).getTime() - (new Date(b.createdDate)).getTime())
    })
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.getValue(KeyType.User));
  }
  dismiss() {
    this.modalController.dismiss();
  }

  doAnswer(comment: PostCommentModel) {
    let today = new Date();

    let answer = $("#doAnswer" + comment.id).val();
    let answerModel: CommentAnswerModel = {
      answer: answer,
      createdDate: (new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes())).toString(),
      user: this.user,
      id: 1
    }
    comment.commentAnswers.push(answerModel);
    this.sortAnswers();
    let addedAnswer = Object.assign({}, answerModel);
    delete addedAnswer.createdDate;
    delete addedAnswer.id;
    delete addedAnswer.user;
    addedAnswer.userId = this.user.id;
    addedAnswer.postCommentId = comment.id;
    this.answerService.add(addedAnswer).subscribe(response => {
      if (response.success) {
        this.messageService.showSuccessAlert("Başarıılı", { iconType: SwalIconType.Success })
      }
    })
  }
  sendComment() {
    let today = new Date();
    let comment = $("#doComment").val();
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
        this.messageService.showSuccessAlert("Yorum yapma Başarıılı", { iconType: SwalIconType.Success })
      }
    }, responseErr => console.log(responseErr))
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

  commentLike(comment: PostCommentModel) {
    if (comment.isClickHeart) {
      comment.isClickHeart = false;
      setTimeout(() => {
        $("#postlike" + comment.id + "_1").animate({
          fontSize: "30px",
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postlike" + comment.id + "_1").animate({
            fontSize: "30px",
            opacity: 1
          })
        }, 200);
      }, 100);
    }
    else {
      comment.isClickHeart = true;
      setTimeout(() => {
        $("#postlike" + comment.id + "_2").animate({
          fontSize: "30px",
          opacity: 0
        }, 0)
        setTimeout(() => {
          $("#postlike" + comment.id + "_2").animate({
            fontSize: "30px",
            opacity: 1
          })
        }, 200);
      }, 100);
    }
  }

}
