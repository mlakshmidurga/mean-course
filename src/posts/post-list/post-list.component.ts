import { Component,OnInit, OnDestroy} from "@angular/core";
import { PageEvent } from "@angular/material";
import {Post} from '../post.model';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';
import { AuthService } from "../../app/auth/auth.service";


@Component({
selector: 'app-post-list',
templateUrl: './post-list.component.html',
styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
    // posts=[
    //     {title:'first post', content:'first content post'},
    //     {title:'second post', content:'second content post'},
    //     {title:'third post', content:'third content post'},
    
    // ]
    isLoading = false;
    posts: Post[] = [];
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];

    userIsAuthenticated;
    userId: string;
    private PostSub: Subscription;
    private authStatusSub: Subscription;

    constructor(public postservice: PostService, private authservice: AuthService){}
    
 ngOnInit(){
    this.isLoading = true;
    this.postservice.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authservice.getUserId();
     this.postservice.getPostUpdateListener()
     .subscribe((postData: { posts: Post[], postCount:  number}) =>{
        this.isLoading = false;
        this.totalPosts = postData.postCount;
         this.posts = postData.posts;

     });
     this.userIsAuthenticated = this.authservice.getIsAuth();
     this.authStatusSub = this.authservice
     .getauthStatusListener()
     .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authservice.getUserId();
     });
 }

onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postservice.getPosts(this.postsPerPage, this.currentPage);
}

 onDelete(postId: string){
     this.isLoading = true;
     this.postservice.deletePost(postId).subscribe(() => {
         this.postservice.getPosts(this.postsPerPage, this.currentPage);
     });
 }

//  ngOnDestroy(){
//      this.PostSub.unsubscribe();
//      this.authStatusSub.unsubscribe();
//  }
}