import { Component, OnInit } from "@angular/core";
import { Properties } from 'app/interfaces/properties';
import { OnixPropertiesService } from "app/services/onix-properties.service";

@Component({
  selector: "app-our-properties",
  templateUrl: "./our-properties.component.html",
  styleUrls: ["./our-properties.component.scss"],
})
export class OurPropertiesComponent implements OnInit {
  public varDataItems: any[];
  public properties: Properties[];
  jsonImg:any[];

  constructor(private propertiesServices: OnixPropertiesService) {}

  ngOnInit(): void {
    this.getProperties();
  }

  async getProperties(){
    await this.propertiesServices.getProperties().subscribe
      (
        (res) => {
          this.properties = res;
          this.properties.forEach(element => {
              this.jsonImg = JSON.parse(element.urlimage);
              const url = this.jsonImg[0].img
              element.urlimage = url;
              const data = this.agregarSeparadorMiles(element.price);
              element.price = `$${data} cop`
          });
          localStorage.setItem('JsonProperties', JSON.stringify(this.properties));
        }
        ,
      (error) => {
        console.error(error);
      });
  }

  agregarSeparadorMiles(numeroString: string): string {
    const numero = parseInt(numeroString, 10); // Convierte la cadena a un número entero
    return numero.toLocaleString(); // Agrega los separadores de miles al número
  }


}
