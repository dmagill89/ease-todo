import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoComponent } from './create-todo.component';
import { NgxsModule, Store } from '@ngxs/store';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTodoComponent, NgxsModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add todo', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.add();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should discard and close create modal', () => {
    component.open = true;

    spyOn(component.todoForm, 'reset');
    spyOn(component.openChange, 'emit');

    component.discard();
    expect(component.todoForm.reset).toHaveBeenCalled();
    expect(component.openChange.emit).toHaveBeenCalled();
  });
});
