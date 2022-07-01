import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';



@NgModule({
  declarations: [
    StoryComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    StoryComponent
  ]
})
export class StoryModule { }
