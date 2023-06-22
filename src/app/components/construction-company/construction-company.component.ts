import { Component, OnInit } from '@angular/core';
import { Section } from 'Enums/sections';
import { OnixInfoformsService } from 'app/services/onix-infoforms.service';
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
  sectionForm;
  addInformation:any={};

  constructor(private serviceInfo: OnixInfoformsService) { }

  ngOnInit(): void {
    this.sectionForm =Section.Construction;

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

  async addInformationSection(){
    this.addInformation.idsection = this.sectionForm;
    await this.serviceInfo.addInfoForms(this.addInformation).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa')
        this.clearInformation();
        alert('Información almacenada, pronto nos comunicaremos contigo!');
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  }

  clearInformation(){
    this.addInformation={};
  }
  
  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
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
