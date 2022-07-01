import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryComponent } from './story.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    StoryComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ], exports: [
    StoryComponent
  ]
})
export class StoryModule { }
