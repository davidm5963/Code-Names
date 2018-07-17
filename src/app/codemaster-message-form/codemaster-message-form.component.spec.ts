import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodemasterMessageFormComponent } from './codemaster-message-form.component';

describe('CodemasterMessageFormComponent', () => {
  let component: CodemasterMessageFormComponent;
  let fixture: ComponentFixture<CodemasterMessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodemasterMessageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodemasterMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
