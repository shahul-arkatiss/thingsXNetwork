import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3MultiTreeComponent } from './d3-multi-tree.component';

describe('D3MultiTreeComponent', () => {
  let component: D3MultiTreeComponent;
  let fixture: ComponentFixture<D3MultiTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D3MultiTreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(D3MultiTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
