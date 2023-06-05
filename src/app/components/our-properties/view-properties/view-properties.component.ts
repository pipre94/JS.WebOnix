import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
} from "@angular/router";
import { Properties } from "app/interfaces/properties";
import { OnixBackService } from "app/services/onix-back.service";

@Component({
  selector: "app-view-properties",
  templateUrl: "./view-properties.component.html",
  styleUrls: ["./view-properties.component.scss"],
})
export class ViewPropertiesComponent implements OnInit {
  id = this.route.snapshot.params.id;
  titleProperties: string;
  valuePropertie: string;
  description: string;
  varDataItems: Properties[];
  viewDetailsPro: any[];
  jsonreceptor;

  constructor(private route: ActivatedRoute, private propertiesServices: OnixBackService) {}

  ngOnInit(): void {
    const data = localStorage.getItem('JsonProperties');
    this.varDataItems = JSON.parse(data);
    this.viewProperties(this.id);
  }

  viewProperties(idProperties: any) {
    for (const key in this.varDataItems) {
      if (this.varDataItems.hasOwnProperty(key)) {
        const value = this.varDataItems[key];
        if (idProperties == value.id) {
          this.titleProperties = value.textProperties;
          this.valuePropertie = value.price;
          this.description = value.details;
          this.viewDetailsPro = JSON.parse(value.viewProperties);
        }
      }
    }
  }
}
