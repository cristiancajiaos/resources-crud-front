import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading',
  imports: [FontAwesomeModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {

  public spinnerIcon: IconDefinition = faSpinner;
}
