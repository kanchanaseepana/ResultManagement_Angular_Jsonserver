import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationEnd } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule,NavBarComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit,OnDestroy{

  result: any = null;
  private routerSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // Retrieve the result from query parameters
    this.route.queryParams.subscribe(params => {
      if (params['name'] && params['score']) {
        this.result = {
          name: params['name'],
          score: params['score']
        };
      }
    });

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Optionally reset the result on navigating away
        this.result = null;
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the router events when the component is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  

  

  goBack(){
    this.result = null;
    this.router.navigate(['/student'])
  }

}
