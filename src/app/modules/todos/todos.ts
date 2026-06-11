import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faPencil, faTimes, faFloppyDisk, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonPipe, NgClass } from '@angular/common';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo-service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todos',
  imports: [ToggleSwitchModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, NgClass],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit, OnDestroy {

  public todoService = inject(TodoService);
  public fb = inject(FormBuilder);
  public toastr = inject(ToastrService);

  public currentTodoId: number;

  public todos: Todo[] = [];

  public todoForm: FormGroup = new FormGroup({});

  public todoCompleted: boolean = false;

  public todoTitle: FormControl = new FormControl('', [Validators.required]);
  public todoCompletedForm: FormControl = new FormControl(false);

  public cancelDeleteIcon: IconDefinition = faTimes;
  public saveIcon: IconDefinition = faFloppyDisk;
  public editIcon: IconDefinition = faPencil;

  private getTodosSubscription: Subscription = new Subscription();
  private saveEditTodoSubcription: Subscription = new Subscription();

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      todoTitle: this.todoTitle,
      todoCompleted: this.todoCompletedForm
    });
    this.getAllTodos();
  }

  private getAllTodos() {
    this.getTodosSubscription = this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (error) => {
        this.toastr.error('There was an error getting the todos');
      },
      complete: () => {}
    });
  }

  public saveOrEditTodo() {
    let todo: Todo = {
      title: this.todoForm.controls['todoTitle'].value,
      completed: this.todoForm.controls['todoCompleted'].value
    };

    if (this.currentTodoId) {
      todo.id = this.currentTodoId;
    }

    this.saveEditTodoSubcription = this.todoService.saveOrUpdateTodo(todo).subscribe({
      next: (todo) => {
        this.toastr.success(`Todo ${this.currentTodoId ? 'edited' : 'created'} successfully`);
        this.resetTodoForm();
        this.getAllTodos();
      },
      error: (error) => {
        this.toastr.error(`Error while trying to save todo: ${error}`);
      },
      complete: () => {

      }
    });
  }

  public resetTodoForm() {
    this.currentTodoId = null;
    this.todoForm.reset();
    this.todoForm.controls['todoTitle'].setValue('');
    this.todoForm.controls['todoCompleted'].setValue(false);
  }

  public editTodo(todo: Todo) {
    this.currentTodoId = todo.id;
    this.todoForm.controls['todoTitle'].setValue(todo.title);
    this.todoForm.controls['todoCompleted'].setValue(todo.completed);
  }

  ngOnDestroy(): void {
    if (this.getTodosSubscription) {
      this.getTodosSubscription.unsubscribe();
    }
    if (this.saveEditTodoSubcription) {
      this.saveEditTodoSubcription.unsubscribe();
    }
  }
}
