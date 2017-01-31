import { Component, OnInit } from '@angular/core';

import { ChallengeService } from '../../services/challenge.service';

import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private recommendedChallenges: Challenge[];
  private popularChallenges: Challenge[];
  constructor(private challengeService: ChallengeService) { }

  ngOnInit() {
    this.challengeService
      .getChallenges({ paging: 3 })
      .subscribe((res: any) => this.renderRecommendedChallenges(res['data']));

    this.challengeService
      .getChallenges({ paging: 3 })
      .subscribe((res: any) => this.renderPopularChallenges(res['data']));
  }
  renderRecommendedChallenges(challenges: Challenge[]) {
    this.recommendedChallenges = challenges;
  }
  renderPopularChallenges(challenges: Challenge[]) {
    this.popularChallenges = challenges;
  }
}
