import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscotecasComponent } from './discotecas.component';

describe('HeroesComponent', () => {
  let component: DiscotecasComponent;
  let fixture: ComponentFixture<DiscotecasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscotecasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscotecasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
