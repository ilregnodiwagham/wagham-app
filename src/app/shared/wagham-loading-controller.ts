import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WaghamLoadingController extends LoadingController {
  private loadingMessages = [
    'Maaaaaster, ma lo vedo che sta caricando?',
    'Massacrdo di goblin in corso...',
    'Aspettando che Jack trovi la strada...',
    'Aspettando che Warren scriva l\'esito...',
  ];

  override create(opts?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    return super.create({
      ...opts,
      message:
        this.loadingMessages[
          Math.floor(Math.random() * this.loadingMessages.length)
        ],
    });
  }
}
