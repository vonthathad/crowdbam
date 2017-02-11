import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Type } from '../../classes/type';
import { ContentService } from '../../services/content.service';
import { HtmlService } from '../../services/html.service';
@Component({
  selector: 'app-challenge-html',
  templateUrl: './challenge-html.component.html',
  styleUrls: ['./challenge-html.component.css']
})
export class ChallengeHtmlComponent implements OnInit {
  private id: number;
  private type: string;
  private html: string;
  public htmls: { type: string, html: string }[];
  private subRoute: any;
  private subParentRoute: any;
  constructor(private route: ActivatedRoute, private cs: ContentService, private hs: HtmlService) {
    this.hs.htmls$.subscribe(htmls => {
      if (htmls) {
        this.htmls = htmls;
        this.htmls.forEach(html => {
          if (html.type == this.type) {
            this.html = html.html;
          }
        })
        console.log(JSON.stringify(htmls));
      }
    });
  }

  ngOnInit() {


    this.subParentRoute = this.route.parent.params.subscribe(params => {
      this.id = params['id'];
    });

    this.subRoute = this.route.params.subscribe(params => {
      this.type = null;
      this.type = params['type'];
      let input = {
        id: this.id,
        type: this.type,
      }

      this.html = '';
      let htmlAlready = false;
      if (this.hs.htmls) {
        this.htmls = this.hs.htmls;
        let i = this.htmls.map(e => e.type).indexOf(this.type);
        if (i != -1) {
          this.html = this.htmls[i].html;
          htmlAlready = true;
        }
      }

      this.cs.getContent(input).subscribe(res => {
        if (res['data'] && res['data'].html) {
          if (!htmlAlready) {
            this.html = res['data'].html;
          }
          console.log("FF " + this.htmls);
          if (this.htmls) {
            let i = this.htmls.map(e => e.type).indexOf(this.type);
            if (i == -1) {
              // console.log("HTMLS I -1" + i);
              this.htmls.push({ type: this.type, html: this.html });
            } else {
              this.htmls[i] = { type: this.type, html: this.html };
            }
            // console.log("HTMLS I" + i);
          } else {
            this.htmls = new Array<{ type: string, html: string }>();
            this.htmls.push({ type: this.type, html: this.html });
          }
          this.hs.htmlsSource.next(this.htmls);
        }
      });
    });

  }

}
