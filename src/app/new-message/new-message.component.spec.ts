import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewMessageComponent } from './new-message.component';

describe('NewMessageComponent', () => {
  let component: NewMessageComponent;
  let fixture: ComponentFixture<NewMessageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NewMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
