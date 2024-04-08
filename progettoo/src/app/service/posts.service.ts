import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  APIURL = environment.apiURL; 
 
   constructor(private http: HttpClient) { }
 
   getPosts(){
    let postRicevuti = this.http.get<Post[]> (`${this.APIURL}posts`);
    console.log(postRicevuti)
     return postRicevuti;
   }

   putPosts(postId: number, post: Post) {
    return this.http.put<Post> (`${this.APIURL}posts/${postId}`, post)
   }

   deletePosts(postId:number) {
    return this.http.delete<Post> (`${this.APIURL}posts/${postId}`)
   }

}
