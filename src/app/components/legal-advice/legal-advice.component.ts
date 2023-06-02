import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal-advice',
  templateUrl: './legal-advice.component.html',
  styleUrls: ['./legal-advice.component.scss']
})
export class LegalAdviceComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;

  constructor() { }

  ngOnInit(): void {
  }

}
