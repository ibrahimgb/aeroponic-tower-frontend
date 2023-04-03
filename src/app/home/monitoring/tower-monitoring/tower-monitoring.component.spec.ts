import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerMonitoringComponent } from './tower-monitoring.component';

describe('TowerMonitoringComponent', () => {
  let component: TowerMonitoringComponent;
  let fixture: ComponentFixture<TowerMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TowerMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TowerMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
