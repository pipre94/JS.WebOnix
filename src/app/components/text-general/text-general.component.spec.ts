import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextGeneralComponent } from './text-general.component';

describe('TextGeneralComponent', () => {
  let component: TextGeneralComponent;
  let fixture: ComponentFixture<TextGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
