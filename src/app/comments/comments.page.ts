import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommentAnswerModel } from '../models/commentAnswerModel';
import { PostCommentModel } from '../models/postCommentModel';
import { UserModel } from '../models/userModel';
import { Usermodel } from '../services/auth.service';
import { KeyType, StorageService } from '../services/storage.service';
declare var $: any

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  user: UserModel;
  @Input() postComments: PostCommentModel[]
  constructor(
    private modalController: ModalController,
    @Inject("baseUrl") public baseUrl: string,
    private storageService: StorageService
  ) { }


  ngOnInit() {
    this.sortComments();
    this.sortAnswers();
    this.getUser();
  }

  sortComments(){
    this.postComments.sort((a,b)=>(new Date(b.createdDate)).getTime()-(new Date(a.createdDate)).getTime())
  }
  sortAnswers(){
    this.postComments.forEach(comment=>{
      comment.commentAnswers.sort((a,b)=>(new Date(b.createdDate)).getTime()-(new Date(a.createdDate)).getTime())
    })
  }
  async getUser() {
    this.user = JSON.parse(await this.storageService.checkName(KeyType.User));
  }
  dismiss() {
    this.modalController.dismiss();
  }

  doAnswer(comment: PostCommentModel) {
    let today = new Date();

    let answer = $("#doAnswer" + comment.id).val();
    let answerModel: CommentAnswerModel = {
      answer: answer,
      createdDate: (new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes())).toString(),
      user: this.user,
      id: 1
    }
    comment.commentAnswers.push(answerModel);
  }
  sendComment() {
    let today = new Date();
    let comment = $("#doComment").val();
    let commentModel: PostCommentModel = {
      comment: comment,
      user: this.user,
      createdDate: (new Date(today.getFullYear(),today.getMonth(),today.getDate(),today.getHours(),today.getMinutes())).toString(),
      commentAnswers: [],
      id: 0
    }
    this.postComments.push(commentModel)
    this.sortComments();
  }

  getDate(dateString: string) {
    let date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

}
