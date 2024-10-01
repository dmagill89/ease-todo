import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { provideStore, Store } from '@ngxs/store';
import { AppState } from '@app/state/todo.state';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [provideStore([AppState])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open add modal', () => {
    const addButton = fixture.debugElement.nativeElement.querySelector('button');

    expect(component.addTodoOpen).toBeFalse();
    addButton.click();
    expect(component.addTodoOpen).toBeTrue();
  });
});
