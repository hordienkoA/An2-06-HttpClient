import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private router = inject(Router);

  onCreateUser(): void{
    const link = ['/users/add'];
    this.router.navigate(link);
  }
  ngOnInit() {
  }

}
