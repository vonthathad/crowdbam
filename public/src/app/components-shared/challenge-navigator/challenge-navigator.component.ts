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
  @Input() private types: Type[];
  @Input() private id: number;
  @ViewChild('fileInput') fileInput: ElementRef;
  private overview: string = 'overview';
  constructor(private renderer: Renderer, private router: Router, private route: ActivatedRoute, private ts: TypeService) {
  }
  ngOnInit() {
    
    let overviewIndex;
    this.types.forEach((type,index)=>{
      console.log(type.id);
      if(type.id === 'overview'){
        overviewIndex = index;
      }
    })
    this.types.splice(overviewIndex, 1);
    console.log(JSON.stringify(this.types));


    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.fileInput.nativeElement, 'dispatchEvent', [event]);
    this.fileInput.nativeElement.click()
  }
  onTypeClick(typeId) {
    this.ts.currentTopicSource.next(typeId);
    console.log(typeId);
    this.router.navigate([`/challenges/${this.id}/others/${typeId}`]);
  }
  onTimeClick() {
    this.ts.currentTopicSource.next('time-line');
    this.router.navigate([`/challenges/${this.id}/timeline`]);
  }
  onCommentsClick() {
    this.ts.currentTopicSource.next('comments');
    this.router.navigate([`/challenges/${this.id}/comments`]);
  }
  changeClass(current) {
    this.current = current;
  }
}
