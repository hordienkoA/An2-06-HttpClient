import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type Observable, map } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @Input({transform: (value: string) => {
    return value ?? 'None';
  }}) sessionId!: string;

  token!: Observable<string>;

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Capture the fragment if available
    this.token = this.route.fragment.pipe(
        map(fragment => fragment || 'None')
    );
  }

}
