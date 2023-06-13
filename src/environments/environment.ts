// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  firebase: {
    projectId: 'onixstorage',
    appId: '1:256395480243:web:9ae244112688068682f4c6',
    storageBucket: 'onixstorage.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyCSIPVI542gvGiAE5tG7Olj9dGTawZWpH8',
    authDomain: 'onixstorage.firebaseapp.com',
    messagingSenderId: '256395480243',
  },
  production: false
};
