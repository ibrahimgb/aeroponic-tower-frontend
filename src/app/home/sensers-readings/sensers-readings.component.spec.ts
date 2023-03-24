import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensersReadingsComponent } from './sensers-readings.component';

describe('SensersReadingsComponent', () => {
  let component: SensersReadingsComponent;
  let fixture: ComponentFixture<SensersReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensersReadingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensersReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
