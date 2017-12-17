/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotifService } from './notif.service';

describe('NotifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifService]
    });
  });

  it('should ...', inject([NotifService], (service: NotifService) => {
    expect(service).toBeTruthy();
  }));
});
