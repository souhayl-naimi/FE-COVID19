import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeARComponent } from './home-ar.component';

describe('HomeARComponent', () => {
  let component: HomeARComponent;
  let fixture: ComponentFixture<HomeARComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeARComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
