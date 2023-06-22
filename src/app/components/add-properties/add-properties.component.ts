import { Component, OnInit } from '@angular/core';
import { Properties } from '../../interfaces/properties';
import { OnixBackService } from 'app/services/onix-back.service';
import { OnixPropertiesService } from 'app/services/onix-properties.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
import { concat } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

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
  viewImages;
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
    const url =  await this.getImages(imagen.name);
    const property = {
            img: url
          };
    this.principalPropertie.push(property);
    alert('La imagen ha sido cargada!');
    this.abuttoon = true;
  }

  async getImages(imgName) {
    this.viewImages;
    const imagesRef = ref(this.storage, 'properties');    
    try {
      const response = await listAll(imagesRef); 
      for (let item of response.items) {
        if (item.name === imgName) {
          this.viewImages = await getDownloadURL(item);
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
    await this.realizarPeticionAsync(files)
    setTimeout(() => {
      alert('Las imagenes han sido cargada!');
      this.abuttoon = true;
    }, 6000);
  } 

  realizarPeticionAsync(files){
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const imgRef = ref(this.storage, `properties/${file.name}`);
      uploadBytes(imgRef, file)
      .then( async response =>{
        const url = await this.getImages(file.name);
        const property = {
          img: url
        };
        this.viewProperties.push(property);
      })
      .catch(error => console.log(error));
    }
  }

  onSubmit(){
    this.addPropertie.urlimage = JSON.stringify(this.principalPropertie);
    this.addPropertie.viewProperties = JSON.stringify(this.viewProperties);
    console.log(this.viewProperties);
    const idProperti = this.addPropertie.id;
    if(idProperti == undefined ){
      if(this.addPropertie.textProperties != undefined && this.addPropertie.price != undefined && this.addPropertie.details != undefined){
        const data = this.agregarSeparadorMiles(this.addPropertie.price);
        this.addPropertie.price = `$${data} cop`
        console.log(this.addPropertie);
        this.addPropertieDb(this.addPropertie); 
        alert("¡Propiedad adicionada!");

      }else{
        alert("¡Digite todos los campos!")
      }
    }else{
      if(this.addPropertie.textProperties != undefined && this.addPropertie.price != undefined && this.addPropertie.details != undefined){
        const data = this.agregarSeparadorMiles(this.addPropertie.price);
        this.addPropertie.price = `$${data} cop`
        console.log(this.addPropertie);
        this.updateUserDb(idProperti,this.addPropertie);
        alert("¡Sus cambios se han actualizado!");
      }else{
        alert("¡Digite todos los campos!")
      }  
    }
  }

  agregarSeparadorMiles(numeroString: string): string {
    const numero = parseInt(numeroString, 10); // Convierte la cadena a un número entero
    return numero.toLocaleString(); // Agrega los separadores de miles al número
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
    console.log(listProperties.viewProperties);
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
              const url = this.jsonImg[0].img;
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
        this.abuttoon= true;
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

}
