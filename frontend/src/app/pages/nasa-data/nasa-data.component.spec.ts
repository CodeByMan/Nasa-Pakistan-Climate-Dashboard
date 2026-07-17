import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { NasaDataComponent } from './nasa-data.component';

describe('NasaDataComponent', () => {
  let component: NasaDataComponent;
  let fixture: ComponentFixture<NasaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasaDataComponent],
      providers: [provideHttpClient(), provideCharts(withDefaultRegisterables())]
    }).compileComponents();

    fixture = TestBed.createComponent(NasaDataComponent);
    component = fixture.componentInstance;
  });

  it('creates the climate data page', () => {
    expect(component).toBeTruthy();
  });

  it('formats NASA date keys for display', () => {
    expect(component.formatDate('20250105')).toContain('2025');
  });
});
