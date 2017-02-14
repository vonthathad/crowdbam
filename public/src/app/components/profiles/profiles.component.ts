import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, NavigationEnd } from '@angular/router';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {Category} from "../../classes/category";
import {CategoryService} from "../../services/category.service";
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  private id : number;
  private selectedUser: User;
  private isMine: boolean = false;
  private user: User;
  private current: string;
  private categories: Category[];
  constructor(private route: ActivatedRoute,private router: Router,private uS: UserService,private categoryService: CategoryService) {
    uS.loggedUserSource.subscribe(user=>{
      this.user = user;
    })
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((res: any)=>{
      this.categories = res.data;
    });
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
        this.user =this.uS.user;
        if(parseInt(this.user._id) == this.id){
          this.isMine = true;
        };
      } else {
        this.uS.loggedUserSource.subscribe(user=>{
          this.user = user;
          if(parseInt(this.user._id) == this.id){
            this.isMine = true;
          };
        })
      }

      this.uS.getInfo(this.id).subscribe((res:any) => {
          this.selectedUser = res.data;
      });
    });
  }
  chooseCategory(category){
    category.isChoose = !category.isChoose;
  }
  pickCategories(){
    let arr = [];
    this.categories.forEach((category)=>{
      if(category.isChoose) arr.push(category.id);
    });
    this.user.recommendations = arr;
    this.updateUser();
  }
  updateUser(){
    this.uS.updateUser(this.user).subscribe((s) =>{
        this.uS.passUser(this.user);
    }, error => console.error(JSON.stringify(error)));
  }
  pickAllCategories(){
    let arr = [];
    this.categories.forEach((category)=>{
      arr.push(category.id);
    });
    this.user.recommendations = arr;
    this.updateUser();
  }
}
