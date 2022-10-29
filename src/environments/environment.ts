// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  waghamApi: 'https://app.ilregnodiwagham.it/api',
  guildId: '699173030722535474',
  // eslint-disable-next-line max-len
  discordAuthUrl: 'https://discord.com/api/oauth2/authorize?client_id=867838410064658481&redirect_uri=http%3A%2F%2Flocalhost%3A8100%2Ftabs%2Fhome&response_type=code&scope=identify%20guilds.members.read',
  waghamInviteUrl: 'https://discord.gg/Rgd6cnbupH'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
