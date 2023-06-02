import { Component, OnInit } from "@angular/core";
import { OnixBackService } from "app/services/onix-back.service";
import { Properties } from 'app/interfaces/properties';

@Component({
  selector: "app-our-properties",
  templateUrl: "./our-properties.component.html",
  styleUrls: ["./our-properties.component.scss"],
})
export class OurPropertiesComponent implements OnInit {
  public varDataItems: any[];
  public properties: Properties[];

  constructor(private propertiesServices: OnixBackService) {}

  ngOnInit(): void {
    this.getProperties();
  }

  async getProperties(){
    await this.propertiesServices.getProperties().subscribe
      (
        (res) => {
          this.properties = res;
          localStorage.setItem('JsonProperties', JSON.stringify(this.properties));
        }
        ,
      (error) => {
        console.error(error);
      }
      )
  }
}
