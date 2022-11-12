import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
data = [
    {
      id: 1,
      name: 'Bao',
      price: 5000,
      description: 'This is one'
    },
    {
      id: 2,
      name: 'Bao 2',
      price: 6000,
      description: 'This is two'
    },
    {
      id: 3,
      name: 'Bao 3',
      price: 7000,
      description: 'This is three'
    },
    {
      id: 4 ,
      name: 'Bao 4',
      price: 8000,
      description: 'This is four'
    },
    {
      id: 5 ,
      name: 'Bao 5',
      price: 9000,
      description: 'This is five'
    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToHone(): void {
    this.router.navigateByUrl('dashboard');
  }
}
