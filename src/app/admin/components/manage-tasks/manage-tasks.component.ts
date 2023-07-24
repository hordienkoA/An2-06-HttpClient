import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'manage-tasks.component.html',
  styleUrls: ['manage-tasks.component.css']
})
export class ManageTasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
