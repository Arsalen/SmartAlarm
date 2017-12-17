/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TchatService } from './tchat.service';

describe('TchatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TchatService]
    });
  });

  it('should ...', inject([TchatService], (service: TchatService) => {
    expect(service).toBeTruthy();
  }));
});
