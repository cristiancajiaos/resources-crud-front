import { Component } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faPencil, faTimes, faFloppyDisk, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-todos',
  imports: [ToggleSwitchModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {

  public todoCompleted: boolean = false; 

  public cancelDeleteIcon: IconDefinition = faTimes;
  public saveIcon: IconDefinition = faFloppyDisk;
  public editIcon: IconDefinition = faPencil;
}
