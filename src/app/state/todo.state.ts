import { Injectable } from '@angular/core';
import { Todo } from '@app/types/todo';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddTodo, DeleteTodo, InitState, UpdateTodo } from '@app/state/todo.actions';

export type State = {
  todos: Todo[];
}

@State<State>({
  name: 'app',
  defaults: {
    todos: []
  }
})
@Injectable()
export class AppState {
  @Selector()
  static getTodos(state: State) {
    return state.todos;
  }

  constructor() { }

  @Action(InitState)
  initTodo(ctx: StateContext<State>) {
    const local = localStorage.getItem('todo');

    if (local) {
      try {
        const todos = JSON.parse(local);

        ctx.patchState({
          todos
        });
      } catch (err) {
        console.error(`Error Unable To Parse JSON: ${err}`);
      }
    }
  }

  @Action(AddTodo)
  addTodo(ctx: StateContext<State>, action: AddTodo) {
    const currentState = ctx.getState();
    const todos = [...currentState.todos, action.todo];

    localStorage.setItem('todo', JSON.stringify(todos));
    ctx.patchState({
      todos
    });
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<State>, action: DeleteTodo) {
    const currentState = ctx.getState();
    const todos = currentState.todos.filter((todo: Todo) => todo.id !== action.id);

    localStorage.setItem('todo', JSON.stringify(todos));
    ctx.patchState({
      todos
    });
  }

  @Action(UpdateTodo)
  updateState(ctx: StateContext<State>, action: UpdateTodo) {
    const currentState = ctx.getState();
    const todos = currentState.todos.map((todo: Todo) => {
      if (todo.id === action.todo.id) {
        return action.todo;
      }

      return todo;
    });

    localStorage.setItem('todo', JSON.stringify(todos));
    ctx.patchState({
      todos
    });
  }
}