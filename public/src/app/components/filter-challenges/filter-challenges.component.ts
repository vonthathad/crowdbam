import { Component, OnInit } from '@angular/core';
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
  private isLoading: boolean;
  constructor(private route: Router,private challengeService: ChallengeService) { }

  ngOnInit() {

    this.route.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.params = {};
        this.params["paging"] = 4;
        this.params["page"] = 1;
        this.filters = this.getRouteParams(event.url);
        this.filterChallenges();
      }
    })
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
  getRouteParams(url:string){
    let urlArray =  url.split('?');
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
