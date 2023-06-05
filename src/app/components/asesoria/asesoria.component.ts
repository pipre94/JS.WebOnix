import { Component, OnInit } from '@angular/core';
import { Section } from 'Enums/sections';
import { OnixInfoformsService } from 'app/services/onix-infoforms.service';

@Component({
  selector: 'app-asesoria',
  templateUrl: './asesoria.component.html',
  styleUrls: ['./asesoria.component.scss']
})
export class AsesoriaComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  sectionForm;
  addInformation:any={};
  
  constructor(private serviceInfo: OnixInfoformsService) {}

  ngOnInit(): void {
    this.sectionForm =Section.RealEstateConsulting;
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

}
