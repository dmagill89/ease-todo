import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTodo } from '@app/state/todo.actions';
import { Todo } from '@app/types/todo';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent implements OnChanges {
  @Input() open!: boolean;

  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("addTodo") dialog!: ElementRef<HTMLDialogElement>;

  public todoForm: FormGroup<{
    title: FormControl<string>,
    dueDate: FormControl<string>
  }>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.todoForm = this.fb.group({
      title: this.fb.control<string>("", { validators: [Validators.required], nonNullable: true }),
      dueDate: this.fb.control<string>("", { validators: [Validators.required], nonNullable: true })
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      this.dialog.nativeElement.showModal();
    }
  }

  public add(): void {
    const form = this.todoForm.getRawValue();
    const todo: Todo = {
      id: crypto.randomUUID(),
      title: form.title,
      completed: false,
      dueDate: form.dueDate
    };

    this.store.dispatch(new AddTodo(todo));
    this.closeDialog();
    this.todoForm.reset();
  }

  public discard(): void {
    this.closeDialog();
    this.todoForm.reset();
  }

  private closeDialog(): void {
    this.dialog.nativeElement.close();
    this.openChange.emit(false);
  }
}
