import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:keydown', ['$event'])

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'a') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
    }
    if (event.key === 'D' || event.key === 'd') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'pink');
    }
    else if (event.key === 's') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'blue');
    }
  }

}
