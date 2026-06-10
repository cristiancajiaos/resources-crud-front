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

  public currentUserId: number;

  public users: User[] = []; 

  public userForm: FormGroup = new FormGroup({});

  public userName: FormControl = new FormControl('', [Validators.required]);
  public userUsername: FormControl = new FormControl('', [Validators.required]);
  public userEmail: FormControl = new FormControl('', [Validators.required, Validators.email]);

  public cancelDeleteIcon: IconDefinition = faTimes;
  public saveIcon: IconDefinition = faFloppyDisk;
  public editIcon: IconDefinition = faEdit;

  public saveOrEditUserSubscription: Subscription = new Subscription();
  public getUsersSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: this.userName,
      username: this.userUsername,
      email: this.userEmail
    });
    this.getAllUsers();
  }

  private getAllUsers(): void {
    this.getUsersSubscription = this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users; 
      },
      error: (error) => {
        this.toastr.error(`Error while trying to get users ${error}`);

      },
      complete: () => {

      }
    });
  }

  public saveOrEditUser(): void {
    let user: User = {
      name: this.userForm.controls['name'].value,
      username: this.userForm.controls['username'].value,
      email: this.userForm.controls['email'].value
    };
    if (this.currentUserId) {
      user.id = this.currentUserId;
    }
    this.saveOrEditUserSubscription = this.userService.saveOrEditUser(user).subscribe({
      next: (user) => {
        this.toastr.success('User saved successfully');
        this.getAllUsers();
      },
      error: (error) => {
        this.toastr.error(`Error trying to save user ${error}`);
      },
      complete: () => {

      }
    });
  }

  public cancelInput(): void {
    this.currentUserId = null;
    this.userForm.reset();
    this.userForm.controls['name'].setValue('');
    this.userForm.controls['username'].setValue('');
    this.userForm.controls['email'].setValue('')
   
  }

  public editUser(user: User): void {
    this.currentUserId = user.id;
    this.userForm.controls['name'].setValue(user.name);
    this.userForm.controls['username'].setValue(user.username);
    this.userForm.controls['email'].setValue(user.email);
  }

  public deleteUser(): void {

  }


  ngOnDestroy(): void {
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
    if (this.saveOrEditUserSubscription) {
      this.saveOrEditUserSubscription.unsubscribe();
    }
  }
}
