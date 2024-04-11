import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Post } from '../models/post';
import { CreatePost } from '../models/create-post';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  APIURL = environment.apiURL; 
 
   constructor(private http: HttpClient) { }
 
   getPosts(){
    let postRicevuti = this.http.get<Post[]> (`${this.APIURL}posts`).pipe(map(posts => this.shuffleArray(posts) ));
    console.log(postRicevuti)
     return postRicevuti;
   }

   private shuffleArray(array: any[]) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

   putPosts(postId: number, post: Post) {
    return this.http.put<Post> (`${this.APIURL}posts/${postId}`, post)
   }

   deletePosts(postId:number) {
    return this.http.delete<Post> (`${this.APIURL}posts/${postId}`)
   }

   postPost(post: CreatePost) {
    return this.http.post (`${this.APIURL}posts`, post)
   }

}
