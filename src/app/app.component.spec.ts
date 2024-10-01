import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { provideStore, Store } from '@ngxs/store';
import { AppState } from './state/todo.state';

describe('AppComponent', () => {
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TodoListComponent],
      providers: [provideStore([AppState])]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ease-todo' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ease-todo');
  });

  it('should initialize state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    store = TestBed.inject(Store);
    
    spyOn(store, 'dispatch');

    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalled();
  })
});
