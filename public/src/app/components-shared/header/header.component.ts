import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service'

import { User } from '../../classes/user';
import {Challenge} from "../../classes/challenge";
import {ChallengeService} from "../../services/challenge.service";


@Component({
  host: {
    '(document:click)':'onClick($event)'
  },
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;
  // private isExploringHide: boolean = false;
  // private isExploringTrans: boolean = false;
  private query = '';
  private maxPage: number = 1;
  private currentPage: number = 1;
  private page: number = 1;
  // private challenges: Challenge[];
  private filteredList = [];
  private searchBegin: boolean = false;
  private searchFinished: boolean = true;
  private isSearching: boolean = false;
  private isOpeningMenu: boolean = false;
  constructor(private us: UserService, private route: ActivatedRoute, private router: Router, private eref: ElementRef, private challengeService: ChallengeService) {
    us.loggedUserSource.subscribe(user => { this.renderUser(user, { from: "change" }) });
  }

  ngOnInit() {
    let token;
    this.route.queryParams.subscribe(queryParam => {
      token = queryParam['token'];
      // console.log("TOKEN " + token);
      // if there is one, take user in db and render to user
      if (token) {
        localStorage.setItem("token", token);
        this.us.getUser(token).subscribe((res: any) => this.renderUser(res.user, { from: "queryParam" }));
      }
    });

    // get token from localstorage if there is one
    token = localStorage.getItem("token");
    // console.log("TOKEN HERE" + token);
    if (token && token != "undefined") {
      this.us.getUser(token).subscribe((res: any) => this.renderUser(res.user, { from: "localStorage" }));
    }

  }
  renderChallenges(challenges) {
    this.searchFinished = true;
    // this.challenges = challenges;
    if(this.filteredList && this.filteredList.length){
      this.filteredList = this.filteredList.concat(challenges);
    } else {
      this.filteredList = challenges;
    }
    // console.log(this.filteredList);
  }
  onClick(event) {
   if (!this.eref.nativeElement.contains(event.target)){
     this.isOpeningMenu = false;
   }  // or some similar check
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.eref.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }
  onClickExplore(){
    $('#filter-frame').removeClass('hide');
    setTimeout(function(){
      $('#filter-content').removeClass('translate');
    });
  }
  nextSearchPage(){
    this.page ++;
    this.currentPage++;
    this.loadSearchQuery(this.query,this.page);
    $('#livesearch-list').offset({top: $('#livesearch-list').offset().top,left: $('#livesearch-list').offset().left - $('#livesearch-results').width()});
  }
  preSearchPage(){
    this.currentPage--;
    $('#livesearch-list').offset({top: $('#livesearch-list').offset().top,left: $('#livesearch-list').offset().left + $('#livesearch-results').width()});
  }
  filter() {
    // if (this.query !== "") {
    //   this.filteredList = this.challenges.filter(function (el) {
    //     return el.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    //   }.bind(this));
    //   this.filteredList = this.filteredList.slice(0,4);
    // } else {
    //   this.filteredList = [];
    // }
    if (this.query.length > 0) {
      this.searchBegin = false;
      if(this.searchFinished){
        this.page = 1;
        this.filteredList = [];
        this.searchBegin = true;
        this.searchFinished = false;
        this.loadSearchQuery(this.query,this.page);
      }
    } else {
      if (this.query.length == 0) {
        this.filteredList = [];
        this.searchBegin = false;
      }
    }
  }
  loadSearchQuery(text,page){
    this.challengeService
      .getChallenges({ paging: 4, text: text,page: page})
      .subscribe((res: any) => {
        this.renderChallenges(res.data);
        if(res.isNext) {
          this.maxPage = this.page + 1;
          // console.log(this.maxPage);
        }
      });
  };
  select(title) {
    this.query = title;
    this.filteredList = [];
  }
  onClickSearch(){
    this.isSearching = true;
    $('.js-search-term').focus();
  }
  onCloseSearch(){
    this.isSearching = false;
    this.filteredList = [];
    this.searchBegin = false;
    this.searchFinished = false;
  }
  onToggleMenu(){
    this.isOpeningMenu = !this.isOpeningMenu;
  }
  renderUser(user, obj) {
    // console.log(user);
    if (obj.from == "queryParam" || obj.from == "localStorage") {
      this.user = new User();
      // console.log("USER" + JSON.stringify(user));
      this.user = user;
      // if (obj.from == "queryParam" || obj.from == "localStorage") {
      // this.us.loggedUserSource.next(this.user);
      // }
      this.us.passUser(this.user);
    } else {
      this.user = user;
    }
  }

  onLoginClick() {
    this.us.openLoginDialog();
  }
  onLogoutClick() {
    localStorage.removeItem("token");
    this.us.passUser(null);
    this.user = null;
    this.router.navigate(['']);
  }
  onCreateChallenge() {
    if (this.us.isLoggedIn()) {
      this.router.navigate(['/challenge-create']);
    } else {
      this.us.openLoginDialog();
    }
  }
}
