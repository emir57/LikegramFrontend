import { Component, Input, OnInit } from '@angular/core';
import { PostCommentModel } from 'src/app/models/postCommentModel';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() comment: PostCommentModel
  constructor() { }

  ngOnInit() { }

}
