import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Post} from 'src/app/models/post';
import { PostsService } from 'src/app/service/posts.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';
import { map } from 'rxjs';
import { ColoService } from 'src/app/service/colo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  posts: Post[] = [];
  post!: Post;
  user!: Login | null;
  edit: boolean = true;
  color: string = '#18A1D0';


  constructor(private postSrv: PostsService, private authSrv: AuthService, private colorSrv: ColoService) {}



  ngOnInit() {
    this.colorSrv.color$.subscribe((color) => {
      if (color) {
        this.color = color
      }
    })
    this.color = this.colorSrv.getColor();
    console.log(this.color);
    setTimeout(() => {
      let spinner = document.getElementById('spin');
      spinner?.classList.add('d-none')
      this.getUser();
      this.getPost();
    }, 1000 );
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
    console.log(postId);
    console.log(this.user?.user.id);
    if (this.user?.user.id === idUser || this.user?.user.admin) {
      this.postSrv.deletePosts(postId).subscribe((response) => {
        console.log('Post eliminato con successo', response);
      });
      this.getPost()
    }
  }

  getPost() {
     this.postSrv.getPosts().subscribe((response) => {
      this.posts = response; 
     })
  }

}
