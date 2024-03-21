import { TestBed } from '@angular/core/testing';

import { CourseRouteActivatorService } from './course-route-activator.service';

describe('CourseRouteActivatorService', () => {
  let service: CourseRouteActivatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseRouteActivatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
