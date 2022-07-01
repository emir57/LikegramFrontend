import { Component, Inject, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'story-card',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  items: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }];
  constructor(
    @Inject("baseUrl") public baseUrl: string
  ) { }

  ngOnInit() { }

  shareStory() {
    const your_story = $("#your-profile-photo");
    your_story.css("transform", "scale(.8)");
    setTimeout(() => {
      your_story.css("transform", "scale(1)");
    }, 200);
  }

  openStory(story: any) {
    const profile = $(`#your-profile-photo${story.id}`);
    profile.css("transform", "scale(.8)");
    setTimeout(() => {
      profile.css("transform", "scale(1)");
    }, 200);
  }

}
