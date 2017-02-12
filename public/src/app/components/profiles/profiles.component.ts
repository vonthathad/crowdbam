import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  private id : number;
  private selectedUser: User;
  private isMine: boolean = false;
  private userId: string;
  private current: string;
  constructor(private route: ActivatedRoute,private router: Router,private uS: UserService) {
    uS.loggedUserSource.subscribe(user=>{
      this.userId = user._id;
    })
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        let arrUrl =event.url.split('?')[0].split('/');
        if(arrUrl[arrUrl.length - 1] != 'follows' && arrUrl[arrUrl.length - 1] != 'settings' && arrUrl[arrUrl.length - 1] != 'challenges'){
          this.current = '';
        } else {
          this.current = arrUrl[arrUrl.length - 1];
        }
        // this.currentEmit.emit(this.current);
      }
    });
    this.route.params.subscribe(params => {
      this.id = params["id"];
      if(this.uS.user){
        this.userId =this.uS.user._id;
        if(parseInt(this.userId) == this.id){
          this.isMine = true;
        };
      } else {
        this.uS.loggedUserSource.subscribe(user=>{
          this.userId = user._id;
          if(parseInt(this.userId) == this.id){
            this.isMine = true;
          };
        })
      }

      this.uS.getInfo(this.id).subscribe((res:any) => {
          this.selectedUser = res.data;
      });
    });
  }
}
