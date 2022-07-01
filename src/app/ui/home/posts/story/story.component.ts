import { Component, Inject, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'story-card',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  items: any[] = [{}, {}, {}, {}, {}, {}, {}, {}];
  constructor(
    @Inject("baseUrl") public baseUrl: string
  ) { }

  ngOnInit() { }

  shareStory() {
    const your_story = $("#your-story");
    your_story.css("transform", "scale(.8)");
    setTimeout(() => {
      your_story.css("transform", "scale(1)");
    }, 200);
  }

}
