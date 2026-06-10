import { faFloppyDisk, faPencil, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from './../../../../node_modules/@fortawesome/fontawesome-common-types/index.d';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { PostService } from '../../services/post-service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-posts',
  imports: [FontAwesomeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class Posts implements OnInit, OnDestroy {

  private postService = inject(PostService); 
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  public currentId: number | null = null;

  public postForm: FormGroup = new FormGroup({});

  public posts: Post[] = [];

  public cancelDeleteIcon: IconDefinition = faTimes;
  public editIcon: IconDefinition = faPencil;
  public saveIcon: IconDefinition = faFloppyDisk;

  private getPostsSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.postForm = this.fb.group({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
    this.getAllPosts();
  }

  public getAllPosts(): void {
    this.getPostsSubscription = this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {},
      complete: () => {}
    });
  }

  public cancelForm(): void {
    this.postForm.reset();
    this.postForm.controls['id'].setValue('');
    this.postForm.controls['title'].setValue('');
    this.postForm.controls['body'].setValue('');
  }

  ngOnDestroy(): void {
    if (this.getPostsSubscription) {
      this.getPostsSubscription.unsubscribe();
    }
  }
}
