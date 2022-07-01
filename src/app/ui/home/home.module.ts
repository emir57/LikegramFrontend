import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PostsPage } from './posts/posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
  exports: [HomePage]
})
export class HomePageModule { }
