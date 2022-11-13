import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./tables/items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./tables/characters/characters.module').then( m => m.CharactersPageModule)
  },
  {
    path: 'backgrounds',
    loadChildren: () => import('./tables/backgrounds/backgrounds.module').then( m => m.BackgroundsPageModule)
  },
  {
    path: 'feats',
    loadChildren: () => import('./tables/feats/feats.module').then( m => m.FeatsPageModule)
  },
  {
    path: 'spells',
    loadChildren: () => import('./tables/spells/spells.module').then( m => m.SpellsPageModule)
  },
  {
    path: 'subclasses',
    loadChildren: () => import('./tables/subclasses/subclasses.module').then( m => m.SubclassesPageModule)
  },  {
    path: 'races',
    loadChildren: () => import('./tables/races/races.module').then( m => m.RacesPageModule)
  },
  {
    path: 'buildings',
    loadChildren: () => import('./tables/buildings/buildings.module').then( m => m.BuildingsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
