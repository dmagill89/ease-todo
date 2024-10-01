import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideStore, Store, UpdateState } from '@ngxs/store';
import { AppState } from '@app/state/todo.state';
import { By } from '@angular/platform-browser';
import { AddTodo, DeleteTodo, UpdateTodo } from './todo.actions';

const INITIAL_STATE = [
  {
    id: 'test-id-1',
    title: 'Test todo 1',
    dueDate: '2024-09-29',
    completed: false,
  },
  {
    id: 'test-id-2',
    title: 'Test todo 2',
    dueDate: '2024-10-11',
    completed: false,
  }
];


describe('Todo State', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideStore([AppState])]
    });

    store = TestBed.inject(Store);
    store.reset({
      app: {
        todos: INITIAL_STATE
      }
    });
  });

  it('should create state', () => {
    expect(store.selectSnapshot(AppState.getTodos)).toBeTruthy();
  });

  it('should add todo to state', async () => {
    const newTodo = {
      id: 'test-id-3',
      title: 'test todo 3',
      dueDate: '2024-11-11',
      completed: false
    };


    let todos = store.snapshot().app.todos;
    expect(todos.length).toBe(2);

    await store.dispatch(new AddTodo(newTodo));
    todos = store.snapshot().app.todos;

    expect(todos.length).toBe(3);
  });

  it('should update state', async () => {
    let todo = store.snapshot().app.todos[0];

    expect(todo.completed).toBeFalse();

    const updateTodo = { ...todo, completed: true };
    await store.dispatch(new UpdateTodo(updateTodo));

    todo = store.snapshot().app.todos[0];
    expect(todo.completed).toBeTrue();
  });

  it('should delete todo', async () => {
    let todos = store.snapshot().app.todos;

    expect(todos.length).toBe(2);

    await store.dispatch(new DeleteTodo('test-id-1'));

    todos = store.snapshot().app.todos;
    expect(todos.length).toBe(1);
  });
});