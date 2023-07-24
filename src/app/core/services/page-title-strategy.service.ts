import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { type RouterStateSnapshot, TitleStrategy } from "@angular/router";

@Injectable()
export class PageTitleStrategy extends TitleStrategy {
  constructor(private titleService: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.titleService.setTitle(`Task Manager - ${title}`);
    } else {
      this.titleService.setTitle(`Task Manager - Home`);
    }
  }
}
