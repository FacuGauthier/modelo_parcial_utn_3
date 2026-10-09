import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaReceta } from './tarjeta-receta';

describe('TarjetaReceta', () => {
  let component: TarjetaReceta;
  let fixture: ComponentFixture<TarjetaReceta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaReceta],
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaReceta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
