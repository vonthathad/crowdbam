import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../classes/category";

@Component({
  selector: 'app-explore-modal',
  templateUrl: './explore-modal.component.html',
  styleUrls: ['./explore-modal.component.css']
})
export class ExploreModalComponent implements OnInit {
  categories: Category[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: any)=>{
      this.categories = res.data;
    });
  }
  onCloseExplore(){
    $('#filter-content').addClass('translate');
    $('#filter-frame').addClass('hide');
  }

}
