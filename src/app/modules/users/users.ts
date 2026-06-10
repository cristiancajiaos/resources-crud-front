import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faFloppyDisk, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {

  private fb = inject(FormBuilder);

  public userForm: FormGroup = new FormGroup({});

  public userName: FormControl = new FormControl('', [Validators.required]);
  public userUsername: FormControl = new FormControl('', [Validators.required]);
  public userEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

  public cancelDeleteIcon: IconDefinition = faTimes;
  public saveIcon: IconDefinition = faFloppyDisk;
  public editIcon: IconDefinition = faEdit;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: this.userName,
      username: this.userUsername,
      email: this.userEmail
    });
  }
}
