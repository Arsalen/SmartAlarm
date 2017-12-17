/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForumCreatorService } from './forum-creator.service';

describe('ForumCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForumCreatorService]
    });
  });

  it('should ...', inject([ForumCreatorService], (service: ForumCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
