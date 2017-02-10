import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {ChallengeService} from "../../services/challenge.service";
import {Challenge} from "../../classes/challenge";
@Component({
  selector: 'app-filter-challenges',
  templateUrl: './filter-challenges.component.html',
  styleUrls: ['./filter-challenges.component.css']
})
export class FilterChallengesComponent implements OnInit {
  private challenges: Challenge[];
  private filters: Object;
  private params: Object;
  private hasMore: boolean;
  private url: string;
  private isLoading: boolean;
  private isOpenSort: boolean = false;
  constructor(private route: Router,private challengeService: ChallengeService,private el: ElementRef) { }

  ngOnInit() {
    this.setPositionSortTypes(false);
    this.route.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.params = {};
        this.params["paging"] = 4;
        this.params["page"] = 1;
        this.isOpenSort = false;
        this.filters = this.getRouteParams(event.url);
        this.filterChallenges();
      }
    })
  }
  openExplore(){
    $('#filter-frame').removeClass('hide');
    setTimeout(function(){
      $('#filter-content').removeClass('translate');
    });
  }
  setPositionSortTypes(open:boolean){
    let openSortBtn = (<HTMLElement>this.el.nativeElement).querySelector('#open-sort-btn') as HTMLElement;
    let sortTypes = (<HTMLElement>this.el.nativeElement).querySelector('#sort-types') as HTMLElement;
    sortTypes.style.left = (openSortBtn.getBoundingClientRect().left ) + 'px';
    if(open){
      sortTypes.style.top = (openSortBtn.getBoundingClientRect().top - sortTypes.clientHeight/2 + 20) + 'px';
    } else {
      sortTypes.style.top = (openSortBtn.getBoundingClientRect().top - sortTypes.clientHeight/2  + 150) + 'px';
    }

  }
  filterChallenges(){
    if(this.filters["sort"]) this.params["order"] = this.filters["sort"];
    switch (this.filters["mode"]){
      case "categories":
            if(this.filters["name"]){
              this.params["category"] = this.filters["name"];
            }
            break;
    }
    this.challengeService
      .getChallenges(this.params)
      .subscribe((res: any) => this.renderGames(res.data,true,res.isNext));

  }
  loadMore(){
    if(this.hasMore && !this.isLoading){
      this.isLoading = true;
      this.params["page"]++;
      this
      this.challengeService
        .getChallenges(this.params)
        .subscribe((res: any) => this.renderGames(res.data,false,res.isNext));
    }
  }
  renderGames(challenges: Challenge[],isNew,isNext) {
    console.log(isNext);
    // console.log(JSON.stringify(games));
    // this.gamesCollections.push({ topic: topic, games: games }); // set to views
    if(isNew){
      this.challenges = challenges;
    } else {
      this.challenges = this.challenges.concat(challenges);
    }
    this.hasMore = isNext;
    this.isLoading = false;
  }
  toggleSort(open:boolean){
    this.isOpenSort = open;
    setTimeout(()=>{
      this.setPositionSortTypes(open);
    })
  };
  getRouteParams(url:string){
    let urlArray =  url.split('?');
    this.url = urlArray[0];
    let obj = {
      "mode": urlArray[0].split('/')[1]
    };
    if(urlArray[0].split('/')[2]){
      obj["name"] = urlArray[0].split('/')[2];
    };
    if(urlArray[1]){
      let queryList = urlArray[1].split('&');
      queryList.forEach(function(e){
        if(e.split('=')[0] == 'sort'){
          obj["sort"] = e.split('=')[1];
          return;
        }
      });

    };
    return obj;
  }

}
