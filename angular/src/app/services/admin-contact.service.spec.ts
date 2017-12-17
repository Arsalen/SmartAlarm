/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminContactService } from './admin-contact.service';

describe('AdminContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminContactService]
    });
  });

  it('should ...', inject([AdminContactService], (service: AdminContactService) => {
    expect(service).toBeTruthy();
  }));
});
