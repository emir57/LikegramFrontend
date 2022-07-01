import { Component, Inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostModel } from 'src/app/models/postModel';
import { FavouritePostService } from 'src/app/services/favourite-post.service';
import { PostLikeService } from 'src/app/services/post-like.service';
import { PostService } from 'src/app/services/post.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: PostModel;
  constructor(
    private storageService: StorageService,
    private postService: PostService,
    @Inject("baseUrl") public baseUrl: string,
    private modalController: ModalController,
    private postLikeService: PostLikeService,
    private favouritePostService: FavouritePostService
  ) { }

  ngOnInit() { }

}
