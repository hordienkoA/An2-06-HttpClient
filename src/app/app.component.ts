import { Component, inject, type OnInit, type OnDestroy } from '@angular/core';
import { Router, type RouterOutlet, NavigationStart, type Event } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { type Subscription, filter } from 'rxjs';
import { MessagesService, CustomPreloadingStrategyService } from './core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  messagesService = inject(MessagesService);
  spinnerService = inject(SpinnerService);

  private router = inject(Router);
  private preloadingStrategy = inject(CustomPreloadingStrategyService);
  private metaService = inject(Meta);
  private sub: { [key: string]: Subscription } = {};

  ngOnInit(): void {
    console.log(`Preloading Modules: `, this.preloadingStrategy.preloadedModules);
    this.setMessageServiceOnRefresh();
  }

  ngOnDestroy(): void {
    this.sub['navigationStart'].unsubscribe();
  }

  onActivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Activated Component', $event, routerOutlet);
    this.metaService.addTags(routerOutlet.activatedRouteData['meta']);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    console.log('Deactivated Component', $event, routerOutlet);
  }

  onRouterLinkActive($event: boolean): void {
    console.log($event);
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }

  private setMessageServiceOnRefresh(): void {
    this.sub['navigationStart'] = this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationStart))
      .subscribe((event: Event) => {
        this.messagesService.isDisplayed = (event as NavigationStart).url.includes('messages:');
      });
  }
}
