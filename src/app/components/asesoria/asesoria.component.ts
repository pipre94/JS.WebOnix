import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asesoria',
  templateUrl: './asesoria.component.html',
  styleUrls: ['./asesoria.component.scss']
})
export class AsesoriaComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  constructor() { }

  ngOnInit(): void {
  }

}
