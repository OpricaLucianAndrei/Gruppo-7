import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Post } from '../models/post';
import { CreatePost } from '../models/create-post';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  APIURL = environment.apiURL; 
  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  public posts$: Observable<Post[]> = this.postsSubject.asObservable();
  private postUpdatedSource = new Subject<void>();
  postUpdated$ = this.postUpdatedSource.asObservable();
 
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

   triggerPostUpdate() {
    this.postUpdatedSource.next();
  }

}
