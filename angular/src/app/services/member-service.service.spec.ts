/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemberServiceService } from './member-service.service';

describe('MemberServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberServiceService]
    });
  });

  it('should ...', inject([MemberServiceService], (service: MemberServiceService) => {
    expect(service).toBeTruthy();
  }));
});
