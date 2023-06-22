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
          });
          localStorage.setItem('JsonProperties', JSON.stringify(this.properties));
        }
        ,
      (error) => {
        console.error(error);
      });
  }
}
