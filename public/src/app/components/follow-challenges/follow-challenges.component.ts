

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ChallengeService} from "../../services/challenge.service";
import {Challenge} from "../../classes/challenge";

@Component({
  selector: 'app-follow-challenges',
  templateUrl: './follow-challenges.component.html',
  styleUrls: ['./follow-challenges.component.css']
})
export class FollowChallengesComponent implements OnInit {
  private challenges: Challenge[];
  private params: Object;
  private hasMore: boolean;
  private isLoading: boolean;
  constructor(private route: ActivatedRoute,private challengeService: ChallengeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = {};
      this.params["paging"] = 4;
      this.params["page"] = 1;
      this.params["follow"] = params["id"];
      this.loadChallenges();
    });
  }

  loadChallenges(){
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
}
