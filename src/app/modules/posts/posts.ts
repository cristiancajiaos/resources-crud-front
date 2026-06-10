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

  public currentId: number;

  public postForm: FormGroup = new FormGroup({});

  public posts: Post[] = [];

  public cancelDeleteIcon: IconDefinition = faTimes;
  public editIcon: IconDefinition = faPencil;
  public saveIcon: IconDefinition = faFloppyDisk;

  private saveOrEditPostSubscription: Subscription = new Subscription(); 
  private getPostsSubscription: Subscription = new Subscription();
  private deletePostSubscription: Subscription = new Subscription();

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
    this.currentId = null;
  }

  public saveOrEditPost() {
    let post: Post = {
      title: this.postForm.controls['title'].value,
      body: this.postForm.controls['body'].value
    };

    if (this.currentId) {
      post.id = this.currentId; 
    }

    this.saveOrEditPostSubscription = this.postService.saveOrEditPost(post).subscribe({
      next: (post) => {
        if (this.currentId) {
          this.toastr.success("Post edited successfully");
        } else {
          this.toastr.success("Post saved successfully");
        }
        this.getAllPosts();
        this.cancelForm();
      },
      error: (error) => {
        this.toastr.error(`Error trying to save post: ${error}`);
      },
      complete: () => {}
    });
  }

  public editPost(post: Post) {
    this.currentId = post.id;
    this.postForm.controls['title'].setValue(post.title);
    this.postForm.controls['body'].setValue(post.body);
  }

  public deletePost(id: number) {
    this.deletePostSubscription = this.postService.deletePost(id).subscribe({
      next: () => {
        this.toastr.success("Post deleted successfully");
        this.getAllPosts(); 
      },
      error: (error) => {
        this.toastr.error(`Error trying to save post: ${error}`);
      },
      complete: () => {}
    });
  }

  ngOnDestroy(): void {
    if (this.getPostsSubscription) {
      this.getPostsSubscription.unsubscribe();
    }
    if (this.saveOrEditPostSubscription) {
      this.saveOrEditPostSubscription.unsubscribe();
    }
  }
}
