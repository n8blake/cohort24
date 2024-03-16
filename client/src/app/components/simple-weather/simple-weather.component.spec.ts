import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWeatherComponent } from './simple-weather.component';

describe('SimpleWeatherComponent', () => {
  let component: SimpleWeatherComponent;
  let fixture: ComponentFixture<SimpleWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
