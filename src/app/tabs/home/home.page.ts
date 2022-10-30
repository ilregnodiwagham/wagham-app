import { Component, OnDestroy, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { environment } from 'src/environments/environment';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';
import { UserType } from 'src/app/models/token.model';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  readonly userType = UserType;
  userRole = null;
  logoPath = `assets/img/logo.png`;
  private browserSubscription: Subscription = null;
  private roleSubscription: Subscription = null;

  constructor(
    private authService: AuthService,
    private iab: InAppBrowser,
    private loadingCtrl: WaghamLoadingController,
    private platform: Platform,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (!!this.browserSubscription) {
      this.browserSubscription.unsubscribe();
      this.roleSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.roleSubscription = this.authService.token.subscribe(token => {
      if(!!token) {
        this.userRole = token.role;
      } else {
        this.userRole = null;
      }
    });
  }

  ionViewWillEnter(): void {
    if (!this.platform.is('hybrid')) {
      const params = new URLSearchParams(window.location.search);
      if (params.has('code')) {
        this.login(params.get('code'));
      }
    }
  }

  discordAuth(): void {
    if (this.platform.is('hybrid')) {
      if (!!this.browserSubscription) {
        this.browserSubscription.unsubscribe();
      }
      const browser = this.iab.create(environment.discordAuthUrl);
      this.browserSubscription = browser.on('loadstop').subscribe(event => {
        if(event.url.startsWith('http://localhost')) {
          const params = new URLSearchParams(new URL(event.url).search);
          if (params.has('code')) {
            browser.close();
            this.login(params.get('code'));
          }
        }
      });
    } else {
      Browser.open({ url: environment.discordAuthUrl, windowName: '_self' });
    }
  }

  login(code: string) {
    this.loadingCtrl.create().then((loadingElement) => {
      loadingElement.present();
      this.authService.login(code)
      .pipe(
        take(1),
      )
      .subscribe(
        (token) => {
          if (token.role !== UserType.newPlayer && token.role !== UserType.outsider) {
            this.router.navigateByUrl('/tabs/character');
          }
          this.userRole = token.role;
          loadingElement.dismiss();
        },
        () => {
          loadingElement.dismiss();
        }
      );
    });
  }

  joinWagham() {
    Browser.open({ url: environment.waghamInviteUrl, windowName: '_self' });
  }
}
