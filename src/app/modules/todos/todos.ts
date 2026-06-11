import { Component, inject, OnInit } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { faPencil, faTimes, faFloppyDisk, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [ToggleSwitchModule, FormsModule, ReactiveFormsModule, FontAwesomeModule, JsonPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {

  public fb = inject(FormBuilder);

  public todoForm: FormGroup = new FormGroup({});

  public todoCompleted: boolean = false;

  public todoTitle: FormControl = new FormControl('', [Validators.required]);
  public todoCompletedForm: FormControl = new FormControl(false);

  public cancelDeleteIcon: IconDefinition = faTimes;
  public saveIcon: IconDefinition = faFloppyDisk;
  public editIcon: IconDefinition = faPencil;

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      todoTitle: this.todoTitle,
      todoCompleted: this.todoCompletedForm
    });
  }

  public saveOrEditTodo() {
    
  }
}
