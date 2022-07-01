import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { PostModule } from './post/post.module';
import { StoryModule } from './story/story.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    PostModule,
    StoryModule
  ],
  declarations: [
    PostsPage
  ]
})
export class PostsPageModule { }
