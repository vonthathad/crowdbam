import { ElementRef, ViewChild, Renderer, Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TypeService } from '../../services/type.service';

import { Type } from '../../classes/type';
@Component({
  selector: 'app-challenge-navigator',
  templateUrl: './challenge-navigator.component.html',
  styleUrls: ['./challenge-navigator.component.css']
})
export class ChallengeNavigatorComponent implements OnInit {
  private current: string;
  private types: Type[];
  @Input() private id: number;
  @ViewChild('fileInput') fileInput: ElementRef;
  private overview: string = 'overview';
  constructor(private renderer: Renderer, private router: Router, private route: ActivatedRoute, private ts: TypeService) {
    ts.types$.subscribe(types => this.renderTypes(types));
  }
  ngOnInit() {
    if(this.ts.types){
      this.renderTypes(this.ts.types);
    }
    let arrUrl = this.router.url.split('?')[0].split('/');
    if(arrUrl[arrUrl.length - 1] == this.id.toString()){
      this.current = 'overview';
    } else {
      this.current = arrUrl[arrUrl.length - 1];
    }


    // let event = new MouseEvent('click', { bubbles: true });
    // this.renderer.invokeElementMethod(
    //   this.fileInput.nativeElement, 'dispatchEvent', [event]);
    // this.fileInput.nativeElement.click()
  }
  renderTypes(types) {
    this.types = types.slice();
    let overviewIndex;
    this.types.forEach((type, index) => {
      if (type.id === 'overview') {
        overviewIndex = index;
      }
    })
    this.types.splice(overviewIndex, 1);
  }
  onTypeClick(typeId) {
    this.ts.typeSource.next(typeId);
    this.router.navigate([`/challenges/${this.id}/others/${typeId}`]);
  }
  onTimeClick() {
    this.ts.typeSource.next('time-line');
    this.router.navigate([`/challenges/${this.id}/timeline`]);
  }
  onCommentsClick() {
    this.ts.typeSource.next('comments');
    this.router.navigate([`/challenges/${this.id}/comments`]);
  }
  changeClass(current) {
    this.current = current;
  }
}
