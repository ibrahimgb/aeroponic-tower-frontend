import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss'],
})
export class ReadingComponent {
  @Input() unit?: string;
  @Input() value?: Observable<number> | null; //progressValue

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  downClr = { background: 'rgb(237, 103, 78)' };
  upClr = { background: 'rgb(119, 203, 154)' };
  constructor(private renderer: Renderer2, private el: ElementRef) {
    // this.renderer.setStyle(
    //   this.el.nativeElement,
    //   'background-color',
    //   'red'
    // );
  }

  ngOnInit() {
    setInterval(() => {
      this.progressStartValue++;
    }, this.speed);
  }

  progressValue = 230;

  style = {
    background: `conic-gradient(rgb(78, 159, 188) ${this.progressValue}deg, #ededed 0deg)`,
  };

  progressStartValue = 0;

  speed = 100;

  progress = setInterval(() => {
    this.progressStartValue++;

    if (this.progressStartValue == this.progressValue) {
      clearInterval(this.progress);
    }
  }, this.speed);
}
