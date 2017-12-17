/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IdService } from './id.service';

describe('IdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdService]
    });
  });

  it('should ...', inject([IdService], (service: IdService) => {
    expect(service).toBeTruthy();
  }));
});
