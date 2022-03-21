import { TestBed } from '@angular/core/testing';

import { RenderingContextService } from './rendering-context.service';

describe('RenderingContextService', () => {
  let service: RenderingContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderingContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
