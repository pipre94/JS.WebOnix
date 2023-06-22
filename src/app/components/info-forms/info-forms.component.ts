import { Component, OnInit, Injectable  } from '@angular/core';
import { NameSection, Section } from 'Enums/sections';
import { OnixInfoformsService } from 'app/services/onix-infoforms.service';
import { table } from 'console';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-info-forms',
  templateUrl: './info-forms.component.html',
  styleUrls: ['./info-forms.component.scss']
})
export class InfoFormsComponent implements OnInit {

  listInfo:any={};
  constructor(private infoServices:OnixInfoformsService) { }

  ngOnInit(): void {
    const data = this.listarInformation();
  }

  async listarInformation(){
    await this.infoServices.getInfoForms().subscribe
      (
        (res) => {
          this.adjustInformationForms(res);
        }
        ,
      (error) => {
        console.error(error);
      });
  }

  adjustInformationForms(listinfo){
    listinfo.forEach(element => {
      switch (element.idsection) {
        case Section.LegalAdvice.toString():
          element.idsection = NameSection.LegalAdvice;          
          break;
          case Section.RealEstateConsulting.toString():
            element.idsection = NameSection.RealEstateConsulting;                
          break;
          case Section.Construction.toString():
            element.idsection = NameSection.Construction;                
          break;     
            default:
          break;
          
        }
      });
      this.listInfo = listinfo;
  }

  async deleteInfoForms(idInfo){
    await this.infoServices.deleteInfoForms(idInfo).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa');
        this.listarInformation();
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });

  }

  getWhatsAppLink(phone){
    const message = '¡Hola!, gracias por comunicarte con Grupo Inmobiliario Onix.'; // Mensaje a enviar
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  btonExportarData(){    
    let tableData=[]
    this.listInfo.forEach(element => {
      const data = { Seccion: element.idsection, Correo: element.email, Nombre: element.fullname, Pregunta:element.information, Telefono: element.phone };      
      tableData.push(data);
    });
    const dateNow = new Date().toLocaleString();
    this.exportToExcel(tableData, `Informacionformularios${dateNow}.xlsx`, 'Sheet 1');
  }

  exportToExcel(tableData: any[], fileName: string, sheetName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
  }
  
}
