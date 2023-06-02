import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPropertiesComponent } from './our-properties.component';

describe('OurPropertiesComponent', () => {
  let component: OurPropertiesComponent;
  let fixture: ComponentFixture<OurPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
