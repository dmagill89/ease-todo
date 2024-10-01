import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteTodo, UpdateTodo } from '@app/state/todo.actions';
import { AppState } from '@app/state/todo.state';
import { Todo } from '@app/types/todo';
import { Store } from '@ngxs/store';
import { CreateTodoComponent } from "./create-todo/create-todo.component";


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CreateTodoComponent,
    FormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  public addTodoOpen: boolean = false;

  public todos: Signal<Todo[]>;

  public searchQuery: WritableSignal<string> = signal('');

  public searchReults: Signal<Todo[]>;

  constructor(private store: Store) {
    this.todos = this.store.selectSignal(AppState.getTodos);
    this.searchReults = computed(() => {
      if (this.searchQuery().length) {
        return this.todos().filter((todo: Todo) => todo.title.toLocaleLowerCase().includes(this.searchQuery().toLocaleLowerCase()));
      } else {
        return this.todos();
      }
    });
  }

  public queryChange(input: any): void {
    let timer;
    
    // debounce the search field.
    return (() => {

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        this.searchQuery.set(input.target.value);
      }, 500);
    })();
  }

  public markComplete(todo: Todo): void {
    this.store.dispatch(new UpdateTodo(todo));
  }

  public deleteTodo(id: string): void {
    this.store.dispatch(new DeleteTodo(id));
  }
}
