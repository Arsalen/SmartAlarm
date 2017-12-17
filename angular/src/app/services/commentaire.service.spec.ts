/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentaireService } from './commentaire.service';

describe('CommentaireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentaireService]
    });
  });

  it('should ...', inject([CommentaireService], (service: CommentaireService) => {
    expect(service).toBeTruthy();
  }));
});
