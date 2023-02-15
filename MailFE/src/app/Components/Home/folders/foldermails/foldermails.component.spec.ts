import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldermailsComponent } from './foldermails.component';

describe('FoldermailsComponent', () => {
  let component: FoldermailsComponent;
  let fixture: ComponentFixture<FoldermailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoldermailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoldermailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
