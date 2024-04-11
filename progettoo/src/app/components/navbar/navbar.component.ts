import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';
import { PostsService } from 'src/app/service/posts.service';
import { CreatePost } from 'src/app/models/create-post';
import { UserService } from 'src/app/service/user.service';
import { ColoService } from 'src/app/service/colo.service';
import { map } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: Login | null;
  listUsers: any[] = [];
  color: string = '#18A1D0';
  posts: Post[] = [];

  constructor(private authSrv: AuthService, private postSrv: PostsService,  private colorSrv: ColoService, private router: Router) {
    this.user = null;
  }

  ngOnInit(): void {
    this.colorSrv.color$.subscribe((color) => {
      if (color) {
        this.color = color
      }
    })
    this.color = this.colorSrv.getColor();  
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
   
  }

  logout() {
    this.authSrv.logout();
    this.colorSrv.removeColor()
  }

  createPost(form: NgForm) {
    if (this.user && form.value.name != '' ) {
      const postData: CreatePost = {
        userId: this.user.user.id,
        authorImg: this.user.user.avatar,
        author: this.user.user.name,
        body: form.value.name,
      };
      this.postSrv.postPost(postData).subscribe(() => {});
      form.reset();
     window.location.reload()
    } else {
      alert ('You have to frist write a post')
    } 
  }

  getAllUsers(){
    this.authSrv.getAllUsers().subscribe(
      (users: any[]) => {
        this.listUsers = users;
        console.log(this.listUsers)
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
