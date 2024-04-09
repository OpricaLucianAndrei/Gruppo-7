import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';
import { PostsService } from 'src/app/service/posts.service';
import { CreatePost } from 'src/app/models/create-post';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  user: Login | null;
  listUsers: any[] = [];

  constructor(private authSrv: AuthService, private postSrv: PostsService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  logout() {
    this.authSrv.logout();
  }

  createPost(form: NgForm) {
    if (this.user) {
      const postData: CreatePost = {
        userId: this.user.user.id,
        authorImg: this.user.user.avatar,
        author: this.user.user.name,
        body: form.value.name,
      };
      this.postSrv.postPost(postData).subscribe(() => {});
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
