import { Component, OnInit } from '@angular/core';
import { Post, User } from 'src/app/models/post';
import { PostsService } from 'src/app/service/posts.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';

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
    this.getRandomPosts();
    this.getUser();
  }

  getRandomPosts() {
    this.postSrv.getPosts().pipe(
      map(posts => this.shuffleArray(posts))
    ).subscribe((randomizedPosts) => {
      this.posts = randomizedPosts;
      console.log(this.posts);
    });
  }
  
  shuffleArray(array: any[]) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  

  getUser() {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
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

  deletePost(postId: number, idUser: number) {
    console.log(postId)
    console.log(this.user?.user.id)
    if (this.user?.user.id === idUser) {
    this.postSrv.deletePosts(postId).subscribe((response) => {
      console.log('Post eliminato con successo', response);
    });
    this.getPost();
  } else {
    alert('Non puoi eliminare questo post');
  }

}
getPost() {
  this.postSrv.getPosts().subscribe((posts) => {
    this.posts = posts;
  });
}
}
