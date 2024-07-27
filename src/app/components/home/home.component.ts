import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as Aos from "aos"
import { partinerType } from 'src/app/Modules/interfaces/pointers.iterface';
import { customOptions } from 'src/app/Modules/owl-carasouel/owl-carasouel';
import { DataService } from 'src/app/Modules/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../Modules/css-styles/carasouel.css']
})
export class HomeComponent implements AfterViewInit , OnInit , OnDestroy {

  partiners: partinerType[] = [];
  setActive = -1; // as a index of the images array
  intRTL: any;  // as an interval to get the interval in it 
  intLTR: any;  // as an interval to get the interval in it 
  cararsouels: any; // as an array to get the html elements in it 

  constructor(private eleRef: ElementRef, private dataServ: DataService) {
    this.getData()
  }

  ngOnInit(): void {
    Aos.init()
  }

  customOptions = customOptions;

  getData() {
    this.partiners = []
    this.dataServ.getPartiners().subscribe((data: any) => {
      for (const key in data) {
        this.partiners.push(data[key])
      }
    })
  }

  ngAfterViewInit(): void {
    // this.addActiveFromRTL();
  }

  // // to remove all the active classes from the elements
  // removeActive() {
  //   this.cararsouels.forEach((ele: any) => {
  //     ele.classList.remove("active-from-right-to-left");
  //     ele.classList.remove("active-from-left-to-right");
  //   })
  // }
  // // for adding active class on the elements and moving them from right to left
  // addActiveFromRTL() {
  //   if (window.innerWidth > 700) {
  //     this.cararsouels = document.querySelectorAll(".desktop .carasouel .carasouel-container");
  //   } else {
  //     this.cararsouels = document.querySelectorAll(".mobile .carasouel .carasouel-container");
  //   }
  //   clearInterval(this.intRTL)
  //   clearInterval(this.intLTR)
  //   this.removeActive();
  //   this.setActive++;
  //   if (this.setActive === this.cararsouels.length)
  //     this.setActive = 0;
  //   this.cararsouels[this.setActive].classList.add("active-from-right-to-left")
  //   this.intRTL = setInterval(() => {
  //     this.addActiveFromRTL()
  //   }, 10000);
  // }
  // // for adding active class on the elements and moving them from left to right
  // addActiveFromLTR() {
  //   if (window.innerWidth > 700) {
  //     this.cararsouels = document.querySelectorAll(".desktop .carasouel .carasouel-container");
  //   } else {
  //     this.cararsouels = document.querySelectorAll(".mobile .carasouel .carasouel-container");
  //   }
  //   clearInterval(this.intRTL)
  //   clearInterval(this.intLTR)
  //   this.removeActive();
  //   this.setActive--;
  //   if (this.setActive < 0)
  //     this.setActive = this.cararsouels.length - 1;
  //   this.cararsouels[this.setActive].classList.add("active-from-left-to-right")
  //   this.intLTR = setInterval(() => {
  //     this.addActiveFromLTR();
  //   }, 10000);
  // }

  ngOnDestroy(): void {
    clearInterval(this.intRTL)
    clearInterval(this.intLTR)
  }

}
