import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';
import { PostsService } from 'src/app/service/posts.service';
import { CreatePost } from 'src/app/models/create-post';
import { UserService } from 'src/app/service/user.service';
import { ColoService } from 'src/app/service/colo.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  user: Login | null;
  listUsers: any[] = [];
  color: string = '#18A1D0';

  constructor(private authSrv: AuthService, private postSrv: PostsService,  private colorSrv: ColoService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.colorSrv.color$.subscribe((color) => {
      if (color) {
        this.color = color;
      }
    });
  
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      if (this.user && this.user.user.color) {
        this.color = this.user.user.color;
      }
    });
  }

  logout() {
    this.authSrv.logout();
  }

  getUser() {
    this.authSrv.user$.subscribe((user) => {
      this.user = user;
      this.color = this.user!.user.color;
      console.log(this.user);
    });
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
