import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.isLoading.asObservable();

  public loadingOn(): void {
    this.isLoading.next(true);
  }

  public loadingOff(): void {
    this.isLoading.next(false); 
  }
}
