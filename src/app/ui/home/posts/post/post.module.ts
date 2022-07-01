import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ], exports: [
    PostComponent
  ]
})
export class PostModule { }
