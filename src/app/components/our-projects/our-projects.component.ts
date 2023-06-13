import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-projects',
  templateUrl: './our-projects.component.html',
  styleUrls: ['./our-projects.component.scss']
})
export class OurProjectsComponent implements OnInit {

  viewDetailsPro=[]
  viewDetailsProM=[]
  constructor() { }

  ngOnInit(): void {

    this.viewImagesPortal();
    this.viewImagesMirador();
  }

  viewImagesPortal(){
    this.viewDetailsPro=[
      { img:'./assets/img/guayabillos.jpg'},
      { img:'./assets/img/img3.jpg'},
      { img:'./assets/img/img4.jpg'},
      { img:'./assets/img/img5.jpg'}
    ];
  }

  viewImagesMirador(){
    this.viewDetailsProM=[
      { img:'./assets/img/LOGO.png'},
      { img:'./assets/img/img1.JPG'},
      { img:'./assets/img/img2.JPG'}
    ];
  }


}
