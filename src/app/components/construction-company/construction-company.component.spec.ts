import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionCompanyComponent } from './construction-company.component';

describe('ConstructionCompanyComponent', () => {
  let component: ConstructionCompanyComponent;
  let fixture: ComponentFixture<ConstructionCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
