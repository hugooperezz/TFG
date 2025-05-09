import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscotecaComponent } from './discoteca.component';

describe('HeroeComponent', () => {
  let component: DiscotecaComponent;
  let fixture: ComponentFixture<DiscotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscotecaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
