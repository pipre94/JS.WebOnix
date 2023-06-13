import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-construction-company',
  templateUrl: './construction-company.component.html',
  styleUrls: ['./construction-company.component.scss']
})
export class ConstructionCompanyComponent implements OnInit {
  focus: any;
  focus1: any;
  viewDetailsPro=[];
  constructor() { }

  ngOnInit(): void {
    this.viewImagesPortal();
  }

  viewImagesPortal(){
    this.viewDetailsPro=[
      { img:'./assets/img/img3.jpg'},
      { img:'./assets/img/img4.jpg'},
      { img:'./assets/img/img4.jpg'},
      { img:'./assets/img/img5.jpg'},
      { img:'./assets/img/LOGO.png'},
      { img:'./assets/img/img1.JPG'},
      { img:'./assets/img/img2.JPG'}
    ];
  }

  scrollToDiv(id) {
    if(id == 1){
      const divElement = document.getElementById('contactanos');
      if (divElement) {
        divElement.scrollIntoView({ behavior: 'smooth' });
      }
    }else{
      const divElement = document.getElementById('masinfo');
      if (divElement) {
        divElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
