import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore-modal',
  templateUrl: './explore-modal.component.html',
  styleUrls: ['./explore-modal.component.css']
})
export class ExploreModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
  onCloseExplore(){
    $('#filter-content').addClass('translate');
    $('#filter-frame').addClass('hide');
  }

}
