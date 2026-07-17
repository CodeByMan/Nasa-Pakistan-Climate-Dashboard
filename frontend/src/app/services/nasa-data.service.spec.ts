import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { NasaDataService } from './nasa-data.service';

describe('NasaDataService', () => {
  it('is created through dependency injection', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    expect(TestBed.inject(NasaDataService)).toBeTruthy();
  });
});
