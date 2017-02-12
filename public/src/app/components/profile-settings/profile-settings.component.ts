import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  private user: User;
  private userForm: FormGroup;
  private id: string;
  constructor(private route: ActivatedRoute,private router: Router,private uS: UserService,private fb: FormBuilder) {

  }
  buildForm(){
    this.userForm = this.fb.group({
      displayName: [this.user.displayName, Validators.compose([Validators.required,Validators.maxLength(26)])],
      website: [this.user.website, Validators.compose([Validators.maxLength(40)])],
      bio: [this.user.bio, Validators.compose([Validators.maxLength(200)])],
    });
  }
  updateUser({value, valid}: {value: User, valid: boolean}){
    this.uS.updateUser(value)
      .subscribe(s => this.suceed(s['data']), error => console.error(JSON.stringify(error)));
  }
  suceed(data){
    alert(data);
  }
  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.id = params["id"];
      if(this.uS.user){
        if(this.uS.user._id == this.id){
          this.user = this.uS.user;
          this.buildForm();
        } else {
          this.router.navigate([`/profiles/${this.id}`])
        };
      } else {
        this.uS.loggedUserSource.subscribe(user=>{
          if(user._id == this.id){
            this.user = this.uS.user;
            this.buildForm();
          } else {
            this.router.navigate([`/profiles/${this.id}`])
          }
        })
      }
    });
  }

}
