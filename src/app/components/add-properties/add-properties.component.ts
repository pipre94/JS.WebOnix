import { Component, OnInit } from '@angular/core';
import { Properties } from '../../interfaces/properties';
import { OnixBackService } from 'app/services/onix-back.service';
import { OnixPropertiesService } from 'app/services/onix-properties.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { concat } from 'rxjs';

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.scss']
})
export class AddPropertiesComponent implements OnInit {

  listProperties:any={};
  addPropertie:any=[];
  hidenTable:boolean= true;
  hidenForm:boolean= false;
  usuario: any = {};
  croppedImage: any = '';
  file;
  files: any = [];
  viewProperties: any = [];
  viewPro =[];
  principalPropertie: any = [];
  viewImages: any = [];
  url;
  jsonImg:any[];
  abuttoon: boolean= false;
  actionsPropertie;

  constructor(private propertiesServ:OnixPropertiesService, private sanitizer: DomSanitizer, private storage:Storage) { 
    this.viewImages=[]
  }

  ngOnInit(): void {
    this.getProperties();
  }

  async fileChangeEvent(event: any){
    this.principalPropertie=[]
    const imagen = event.target.files[0];
    const imgRef = ref(this.storage, `properties/${imagen.name}`);
    uploadBytes(imgRef, imagen);     
    this.principalPropertie =  await this.getImages(imagen.name);
    alert('Imagenen han sido cargadas!');
    this.abuttoon = true;
  }

  async getImages(imgName) {
    this.viewImages = [];
    const imagesRef = ref(this.storage, 'properties');
    
    try {
      const response = await listAll(imagesRef);
      
      for (let item of response.items) {
        if (item.name === imgName) {
          const url = await getDownloadURL(item);
          console.log(url);
          const property = {
            name: item.name,
            imgUrl: url
          };
          this.viewImages.push(property);
        }
      }
      return this.viewImages;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  

  async onFileSelected(event: any) {
    this.viewProperties = [];
    this.abuttoon = false;
    const files: FileList = event.target.files;
  
    const promises = Array.from(files).map(async (file: File) => {
      const imgRef = ref(this.storage, `properties/${file.name}`);
      await uploadBytes(imgRef, file).catch(error => console.log(error));
      return this.getImages(file.name);      
    });
    
  
    try {
      if(promises != null){
        const viewProperties = await Promise.all(promises);
        this.viewProperties.push(...viewProperties);
        alert('Imagenes han sido cargadas!');
        this.abuttoon = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(){

    this.addPropertie.urlimage = JSON.stringify(this.principalPropertie);
    this.addPropertie.viewProperties = JSON.stringify(this.viewProperties);
    console.log(this.addPropertie);
    const idProperti = this.addPropertie.id;
    if(idProperti == undefined ){
      this.addPropertieDb(this.addPropertie); 
    }else{
      this.updateUserDb(idProperti,this.addPropertie);     
    }
  }

  clearItem(){
    this.addPropertie={};
  }

  async addPropertieDb(addPropertie){
    await this.propertiesServ.addProperties(addPropertie).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa')
        this.principalPropertie=[];
        this.viewProperties=[];
        this.clearItem();
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  }

  async updateUserDb(addPropertie,listProperties){
    
    if (listProperties.urlimage === '[]') {
      delete listProperties.urlimage;
    }
    if (listProperties.viewProperties === '[]') {
      delete listProperties.viewProperties;
    }
    console.log(listProperties);
    await this.propertiesServ.updateProperties(addPropertie, listProperties).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa')
        this.clearItem();
        this.getProperties();
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  }


  async deleteUserDb(IdProperti){
    await this.propertiesServ.deleteProperties(IdProperti).subscribe({
      next: (response) => {
        console.log('la petición fue exitosa');
        this.getProperties();
      }, 
      error: () =>{
        console.log('ocurrió un error al hacer la petición')
      }
    });
  }

  async getProperties(){
    await this.propertiesServ.getProperties().subscribe
      (
        (res) => {
          this.listProperties = res;
          this.listProperties.forEach(element => {
              this.jsonImg = JSON.parse(element.urlimage);
              const url = this.jsonImg[0].imgUrl;
              element.urlimage = url;
          });
        },
      (error) => {
        console.error(error);
      });
  }

  async findPropertiById(idProp){
    await this.propertiesServ.getPropertiesById(idProp).subscribe
      (
        (res) => {
          this.addPropertie = res;
        },
      (error) => {
        console.error(error);
      });
  }

  ocultarItem(value:number,idProp){

    switch (value) {
      case 0:
        this.clearItem();
        this.actionsPropertie = "Adicionar nueva propiedad";
        this.hidenTable = false;
        this.hidenForm = true;
        break;      
      case 1:
        this.clearItem();
        this.hidenTable = true;
        this.hidenForm = false;
        this.getProperties();
        break;
      case 2:
        this.actionsPropertie = "Actualizar propiedad";        
        this.abuttoon= false;
        this.clearItem();
        this.hidenTable = false;
        this.hidenForm = true;
        this.findPropertiById(idProp);
        break;
      default:
        this.hidenTable= true;
        break;
    }  
  }

}
