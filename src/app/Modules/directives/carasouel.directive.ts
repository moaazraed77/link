import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCarasouel]'
})
export class CarasouelDirective implements AfterViewInit {

  setActive = -1;
  intRTL: any;
  intLTR: any;
  cararsouels: any;
  carasouelNum = 0;

  constructor(private eleRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.cararsouels = document.querySelectorAll(".carasouel .carasouel-container");
    this.addActiveFromRTL()
    console.log(this.cararsouels)
  }

  removeActive() {
    this.cararsouels.forEach((ele: any) => {
      ele.classList.remove("active-from-right-to-left");
      ele.classList.remove("active-from-left-to-right");
    })
  }

  // for adding active class on the elements and moving them from right to left
  addActiveFromRTL() {
    clearInterval(this.intRTL)
    clearInterval(this.intLTR)
    this.removeActive();
    this.setActive++;
    if (this.setActive === this.cararsouels.length)
      this.setActive = 0;
    this.cararsouels[this.setActive].classList.add("active-from-right-to-left")
    this.intRTL = setInterval(() => {
      this.addActiveFromRTL()
    }, 8000);
  }
  // for adding active class on the elements and moving them from left to right
  addActiveFromLTR() {
    clearInterval(this.intRTL)
    clearInterval(this.intLTR)
    this.removeActive();
    this.setActive--;
    if (this.setActive < 0)
      this.setActive = this.cararsouels.length - 1;
    this.cararsouels[this.setActive].classList.add("active-from-left-to-right")
    this.intLTR = setInterval(() => {
      this.addActiveFromLTR();
    }, 8000);
  }
  // change carasouel direction 
  carasouelDirection(direction: string) {
    if (direction == "rtl") {
      this.addActiveFromRTL();
    }
    else {
      this.addActiveFromLTR()
    }
  }


}
