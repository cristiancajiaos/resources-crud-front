import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private http = inject(HttpClient);

  public getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('/todo');
  }

  public saveOrUpdateTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>('/todo', todo);
  }
}
