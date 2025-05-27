import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
