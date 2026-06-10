import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faFloppyDisk, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit, OnDestroy {

  private userService = inject(UserService); 
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  private currentUserId: number;

  public users: User[] = []; 

  public userForm: FormGroup = new FormGroup({});

  public userName: FormControl = new FormControl('', [Validators.required]);
  public userUsername: FormControl = new FormControl('', [Validators.required]);
  public userEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

  public cancelDeleteIcon: IconDefinition = faTimes;
  public saveIcon: IconDefinition = faFloppyDisk;
  public editIcon: IconDefinition = faEdit;

  public getUsersSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: this.userName,
      username: this.userUsername,
      email: this.userEmail
    });
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.getUsersSubscription = this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users; 
      },
      error: (error) => {
        this.toastr.error(`Error while ying to get users ${error}`);

      },
      complete: () => {

      }
    });

  }

  ngOnDestroy(): void {
      if (this.getUsersSubscription) {
        this.getUsersSubscription.unsubscribe();
      }
  }
}
