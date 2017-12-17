/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestServiceTimeService } from './test-service-time.service';

describe('TestServiceTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestServiceTimeService]
    });
  });

  it('should ...', inject([TestServiceTimeService], (service: TestServiceTimeService) => {
    expect(service).toBeTruthy();
  }));
});
