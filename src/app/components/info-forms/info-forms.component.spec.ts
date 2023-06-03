import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFormsComponent } from './info-forms.component';

describe('InfoFormsComponent', () => {
  let component: InfoFormsComponent;
  let fixture: ComponentFixture<InfoFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
