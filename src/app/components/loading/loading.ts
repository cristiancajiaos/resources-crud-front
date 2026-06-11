import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from '../../services/loading-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './loading.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loading.scss',
})
export class Loading {
  private loadingService = inject(LoadingService);

  public loading$ = this.loadingService.isLoading$;

  public spinnerIcon: IconDefinition = faSpinner;
}
