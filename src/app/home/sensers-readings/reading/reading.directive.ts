import { Directive , ElementRef , OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReading]'
})
export class ReadingDirective implements OnInit {
  progress = null
  constructor(private element: Element, private renderer: Renderer2) { }



  ngOnInit(): void {

  }


}
