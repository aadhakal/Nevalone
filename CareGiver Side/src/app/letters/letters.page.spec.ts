import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LettersPage } from './letters.page';

describe('LettersPage', () => {
  let component: LettersPage;
  let fixture: ComponentFixture<LettersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
