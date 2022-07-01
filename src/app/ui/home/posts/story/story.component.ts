import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'story-card',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  constructor(
    @Inject("baseUrl") public baseUrl: string
  ) { }

  ngOnInit() { }

}
