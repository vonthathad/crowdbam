import { Component } from '@angular/core';
import { FacebookService, FacebookInitParams } from "ng2-facebook-sdk";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private facebookService: FacebookService){
    let facebookInitParams: FacebookInitParams = {
      appId: '1830778963800870',
      xfbml: true,
      version: 'v2.8'
    };
    facebookService.init(facebookInitParams);
  }
}
