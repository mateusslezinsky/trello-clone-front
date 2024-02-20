import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuSvgComponent } from './create-menu-svg.component';

describe('CreateMenuSvgComponent', () => {
  let component: CreateMenuSvgComponent;
  let fixture: ComponentFixture<CreateMenuSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMenuSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMenuSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
