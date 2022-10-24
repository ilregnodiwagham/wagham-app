import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  userIsLoggedIn = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.userIsAuthenticated.subscribe(isAuthenticated => this.userIsLoggedIn = isAuthenticated);
  }

}
