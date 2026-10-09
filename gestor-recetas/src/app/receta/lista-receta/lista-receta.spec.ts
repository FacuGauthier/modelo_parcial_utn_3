import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaReceta } from './lista-receta';

describe('ListaReceta', () => {
  let component: ListaReceta;
  let fixture: ComponentFixture<ListaReceta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReceta],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaReceta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
