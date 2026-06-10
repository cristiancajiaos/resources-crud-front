import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faFloppyDisk, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  imports: [FontAwesomeModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {

  public cancelDeleteIcon: IconDefinition = faTimes;
  public saveIcon: IconDefinition = faFloppyDisk;
  public editIcon: IconDefinition = faEdit;
}
