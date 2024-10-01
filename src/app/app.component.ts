import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from "@app/components/todo-list/todo-list.component";
import { Store } from '@ngxs/store';
import { initFlowbite } from 'flowbite';
import { InitState } from '@app/state/todo.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ease-todo';

  constructor(private store: Store) {}

  ngOnInit() {
    initFlowbite();
    this.store.dispatch(new InitState());
  }
}
