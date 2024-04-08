import { Component, OnInit } from '@angular/core';
import { Post, User } from 'src/app/models/post';
import { PostsService } from 'src/app/service/posts.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  post!: Post;
  user!: Login | null;
  edit: boolean = true;

  constructor(private postSrv: PostsService, private authSrv: AuthService) {}

  ngOnInit() {
    this.getPosts();
    this.getUser();
  }

  getPosts() {
    this.postSrv.getPosts().subscribe((post) => {
      this.posts = post;
      console.log(this.posts);
    });
  }

  getUser() {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
    });
  }

  eseguiPut(postId: number, post: Post) {
    console.log(postId);
    this.postSrv.putPosts(postId, post).subscribe(
      (response) => {
        console.log('Post aggiornato con successo', response);
      },
      (error) => {
        console.error("Errore durante l'aggiornamento del post", error);
      }
    );
  }

  deletePost(postId: number) {
    this.postSrv.deletePosts(postId).subscribe((response) => {
      console.log('Post eliminato con successo', response);
    });
    this.getPosts()
  }
}
