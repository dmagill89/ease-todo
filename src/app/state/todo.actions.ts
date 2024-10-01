import { Todo } from "@app/types/todo";

export class InitState {
  static readonly type = "[Todo] Init Todo";

  constructor() {}
}

export class AddTodo {
  static readonly type = "[Todo] Add Todo";

  constructor(public todo: Todo) { }
}

export class DeleteTodo {
  static readonly type = "[Todo] Delete Todo";

  constructor(public id: string) { }
}

export class UpdateTodo {
  static readonly type = "[Todo] Update Todo";

  constructor(public todo: Todo) { }
}