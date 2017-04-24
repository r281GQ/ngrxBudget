import { TestBed, inject } from '@angular/core/testing';

import { RepoService } from './repo.service';

xdescribe('RepoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepoService]
    });
  });

  it('should ...', inject([RepoService], (service: RepoService) => {
    expect(service).toBeTruthy();
  }));
});
