import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateExperianceComponent } from './candidate-experiance.component';

describe('CandidateExperianceComponent', () => {
  let component: CandidateExperianceComponent;
  let fixture: ComponentFixture<CandidateExperianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateExperianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateExperianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
