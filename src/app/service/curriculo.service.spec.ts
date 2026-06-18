import { TestBed } from '@angular/core/testing';
import { CurriculoService } from './curriculo.service';
import { provideHttpClient } from '@angular/common/http';

describe('CurriculoService', () => {
  let service: CurriculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CurriculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
