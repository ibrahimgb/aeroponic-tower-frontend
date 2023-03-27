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
  @Input() beforeValue?: Observable<number> | null;
  increasedValue!: number;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  downClr = 'rgb(237, 103, 78)';
  upClr = 'rgb(119, 203, 154)';

  clr: string = 'rgb(78, 159, 188)';

  clrList = [
    '#2d62ff',
    '#3786ff',
    '#50b2ff',
    '#79dcff',
    '#95ecff',
    '#fbffc8',
    '#fbffc8',
    '#fa8365',
    '#ec554f',
    '#dd323a',
    '#b80e27',
  ];
  //0 5 10 15 20 25 30 35 40 45 50

  progressValue?: number;
  constructor(private renderer: Renderer2, private el: ElementRef) {
    // this.renderer.setStyle(
    //   this.el.nativeElement,
    //   'background-color',
    //   'red'
    // );
  }

  ngOnInit() {
    const value = JSON.parse(JSON.stringify(this.value));
    const beforeValue = JSON.parse(JSON.stringify(this.beforeValue));

    if (this.unit === '%') {
      this.progressValue = (value / 100) * 360;
    } else {
      this.progressValue = 360;
      if (this.unit === 'C') {
        this.clr = this.clrList[Math.floor(value / 5)];
      }
    }
    console.log(this.progressValue);

    setInterval(() => {
      this.progressStartValue++;
    }, this.speed);

    this.style = {
      background: `conic-gradient( ${this.clr} ${this.progressValue}deg, #ededed 0deg)`,
    };

    if (value >= beforeValue) {
      this.increasedValue = 100 * Math.abs(value / beforeValue - 1);
    } else {
      this.increasedValue = -100 * Math.abs(beforeValue / value - 1);
    }
  }

  style?: any;

  progressStartValue = 0;

  speed = 100;

  progress = setInterval(() => {
    this.progressStartValue++;

    if (this.progressStartValue == this.progressValue) {
      clearInterval(this.progress);
    }
  }, this.speed);

  icon() {
    if (this.increasedValue < 0) {
      return faArrowDown;
    }
    return faArrowUp;
  }
}
