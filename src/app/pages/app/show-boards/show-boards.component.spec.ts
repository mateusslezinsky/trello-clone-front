import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBoardsComponent } from './show-boards.component';

describe('ShowBoardsComponent', () => {
  let component: ShowBoardsComponent;
  let fixture: ComponentFixture<ShowBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBoardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
