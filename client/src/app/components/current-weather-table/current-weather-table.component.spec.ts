import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherTableComponent } from './current-weather-table.component';

describe('CurrentWeatherTableComponent', () => {
  let component: CurrentWeatherTableComponent;
  let fixture: ComponentFixture<CurrentWeatherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
