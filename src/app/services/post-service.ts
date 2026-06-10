import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private http = inject(HttpClient);

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`/posts`); 
  }
}
