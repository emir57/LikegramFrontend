import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'story-card',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  items: any[] = [{}, {}, {}, {}];
  constructor(
    @Inject("baseUrl") public baseUrl: string
  ) { }

  ngOnInit() { }

}
