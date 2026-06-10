import { faFloppyDisk, faPencil, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from './../../../../node_modules/@fortawesome/fontawesome-common-types/index.d';
import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit {

  private fb = inject(FormBuilder);

  public currentId: number | null = null;

  public postForm: FormGroup = new FormGroup({});

  public cancelDeleteIcon: IconDefinition = faTimes;
  public editIcon: IconDefinition = faPencil;
  public saveIcon: IconDefinition = faFloppyDisk;

  ngOnInit(): void {
    this.postForm = this.fb.group({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }

  public cancelForm(): void {
    this.postForm.reset();
    this.postForm.controls['id'].setValue('');
    this.postForm.controls['title'].setValue('');
    this.postForm.controls['body'].setValue('');
  }
}
